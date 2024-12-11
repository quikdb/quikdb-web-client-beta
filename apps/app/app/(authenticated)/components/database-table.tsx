'use client';

import React, { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, Trash2Icon } from 'lucide-react';

import { Button } from '@repo/design-system/components/ui/button';
import { Checkbox } from '@repo/design-system/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { Input } from '@repo/design-system/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/design-system/components/ui/alert-dialog';
import Link from 'next/link';
import { toast } from 'sonner';

export type Database = {
  id: string;
  fields: Record<string, string> | undefined;
};

interface DatabaseTableProps {
  data: Database[];
  schemaIndex: string[]; // Available indexes for search
  schemaName: string | null; // Name of the schema
}

export const columns: ColumnDef<Database>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className=""
        checked={
          table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? 'indeterminate' : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className=""
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <pre
        className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] cursor-pointer hover:overflow-auto hover:whitespace-normal"
        title={row.getValue('id')}
      >
        {row.getValue('id')}
      </pre>
    ),
  },
  {
    accessorKey: 'fields',
    header: 'DATA',
    cell: ({ row }) => {
      const fields = row.getValue('fields') as [string, string][];

      if (!fields) {
        return <div>No fields available</div>;
      }

      const fieldsObject = Object.fromEntries(fields);

      return (
        <pre className="text-gray-200 p-2 rounded-md whitespace-pre-wrap">
          {JSON.stringify(fieldsObject, null, 2)}
        </pre>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const database = row.original;

      return (
        <AlertDialog>
          <AlertDialogTrigger asChild className="cursor-pointer">
            <Trash2Icon size={18} />
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#111015] text-white border-[#242527] font-regular">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>You are about to remove this dataset from your group list.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="bg-red-700 hover:bg-red-500 border-none rounded-3xl py-2">
                Yes, Delete
              </AlertDialogAction>
              <AlertDialogCancel className="bg-transparent border-[#242527] py-2 rounded-3xl">
                No, Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];

export function DatabaseTable({ data, schemaIndex, schemaName }: DatabaseTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedIndexes, setSelectedIndexes] = useState<string[]>([]); // Track selected indexes
  const [searchText, setSearchText] = useState(''); // Track search input
  const [loading, setLoading] = useState(false);

  const searchIndex = async () => {
    if (!schemaName || selectedIndexes.length === 0) {
      toast.warning('Please select schema and indexes to search');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/search-schema-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schemaName, indexes: selectedIndexes, searchText }),
      });

      if (response.ok) {
        toast.success('Data fetched successfully');
        const searchData = await response.json();
        console.log('Search results:', searchData);
        // Update data with search results if needed
      } else {
        toast.warning('Error fetching data: ' + response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 pt-7 pb-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-gray-900 text-white px-4 py-2">
              {selectedIndexes.length > 0
                ? `Indexes (${selectedIndexes.length})`
                : 'Select Indexes'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-gray-900 text-white">
            {schemaIndex.map((index) => (
              <DropdownMenuCheckboxItem
                key={index}
                checked={selectedIndexes.includes(index)}
                onCheckedChange={() =>
                  setSelectedIndexes((prev) =>
                    prev.includes(index)
                      ? prev.filter((i) => i !== index)
                      : [...prev, index]
                  )
                }
              >
                {index}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          placeholder="Search text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-sm h-11"
        />

        <Button onClick={searchIndex} className="bg-[#72F5DD] text-white px-4 py-2">
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      <div className="rounded-md border border-[#242527]">
        <table className="min-w-full divide-y">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-700">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-sm text-gray-200">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-400"
                >
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
