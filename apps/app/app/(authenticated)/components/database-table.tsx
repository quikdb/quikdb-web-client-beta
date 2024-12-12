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

import { Button } from '@quikdb/design-system/components/ui/button';
import { Checkbox } from '@quikdb/design-system/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@quikdb/design-system/components/ui/dropdown-menu';
import { Input } from '@quikdb/design-system/components/ui/input';
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
} from '@quikdb/design-system/components/ui/alert-dialog';
import { toast } from 'sonner';

export type Database = {
  id: string;
  fields: Record<string, string> | undefined;
};

interface DatabaseTableProps {
  data: Database[];
  schemaIndex: string[]; 
  schemaName: string | null; 
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
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({}); // Store values for each field
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Database[] | null>(null); // Store search results

  const handleFieldChange = (field: string, value: string) => {
    setFieldValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const searchIndex = async () => {
    if (!schemaName || selectedIndexes.length === 0) {
      toast.warning('Please select schema and indexes to search');
      return;
    }

    setLoading(true);
    try {
      const filters = selectedIndexes.map((index) => [index, fieldValues[index] || '']);
      console.log('Filters:', filters);

      const response = await fetch(`/api/search-schema-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schemaName, filters }),
      });
      console.log('Search response:', response);

      if (response.ok) {
        const searchData = await response.json();
        console.log('Search results:', searchData);

        if (Array.isArray(searchData?.ok)) {
          setSearchResults(searchData.ok); // Update search results
          toast.success('Data searched successfully');
        } else {
          toast.warning('No results found');
        }
      } else {
        toast.warning('Error searching data: ' + response.status);
      }
    } catch (error) {
      console.error('Error searching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const table = useReactTable({
    data: searchResults || data, 
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
      <div className="flex flex-col gap-4 pt-7 pb-5">
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gray-900 hover:bg-gradient hover:text-gray-900 text-white px-4 py-2">
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

          <Button onClick={searchIndex} className="bg-[#72F5DD] text-gray-900 px-4 py-2">
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          {selectedIndexes.map((index) => (
            <Input
              key={index}
              placeholder={`Enter ${index}`}
              value={fieldValues[index] || ''}
              onChange={(e) => handleFieldChange(index, e.target.value)}
              className="max-w-sm h-11"
            />
          ))}
        </div>
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
