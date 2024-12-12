'use client';

import * as React from 'react';
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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@quikdb/design-system/components/ui/dropdown-menu';
import { Input } from '@quikdb/design-system/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@quikdb/design-system/components/ui/table';
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
import Link from 'next/link';

const data: Database[] = [
  {
    id: '5hgkg57',
    document: '{ id”:763937292837, “Location”;”New York, NY”, “Price”:”850,000” “Year built”:”1993”, “...” }',
  },
  {
    id: '5hgkg57',
    document: '{ id”:763937292837, “Location”;”New York, NY”, “Price”:”850,000” “Year built”:”1993”, “...” }',
  },
  {
    id: '5hgkg57',
    document: '{ id”:763937292837, “Location”;”New York, NY”, “Price”:”850,000” “Year built”:”1993”, “...” }',
  },
  {
    id: '5hgkg57',
    document: '{ id”:763937292837, “Location”;”New York, NY”, “Price”:”850,000” “Year built”:”1993”, “...” }',
  },
  {
    id: '5hgkg57',
    document: '{ id”:763937292837, “Location”;”New York, NY”, “Price”:”850,000” “Year built”:”1993”, “...” }',
  },
  {
    id: '5hgkg57',
    document: '{ id”:763937292837, “Location”;”New York, NY”, “Price”:”850,000” “Year built”:”1993”, “...” }',
  },
  {
    id: '5hgkg57',
    document: '{ id”:763937292837, “Location”;”New York, NY”, “Price”:”850,000” “Year built”:”1993”, “...” }',
  },
];

export type Database = {
  id: string;
  document: string;
};

export const columns: ColumnDef<Database>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className='ml-5'
        checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? 'indeterminate' : false}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox className='ml-5' checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'document',
    header: 'document',
    cell: ({ row }) => <div>{row.getValue('document')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const database = row.original;

      return (
        <AlertDialog>
          <AlertDialogTrigger asChild className='cursor-pointer'>
            <Trash2Icon size={18} />
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-[#111015] text-white border-[#242527] font-regular'>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>You are about to remove this dataset from your group list</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className='bg-red-700 hover:bg-red-500 border-none rounded-3xl py-2'>Yes, Delete</AlertDialogAction>
              <AlertDialogCancel className='bg-transparent border-[#242527] py-2 rounded-3xl'>No, Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];

export function DatabaseTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full'>
      <div className='flex items-center pt-7 pb-5'>
        <Input
          placeholder='Filter emails...'
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
          className='max-w-sm h-11'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='h-11'>
            <Button className='ml-auto bg-transparent text-white border border-[#242527] max-md:text-xs'>
              Columns <ChevronDown className='max-md:scale-75' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-[#111015] text-white border-gray-600'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border border-[#242527]'>
        <Table className='max-md:text-xs'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='py-4 max-md:first:pl-0'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='font-light'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='py-6 max-md:first:pl-0 last:px-3'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Link href='/dashboard/project-1'>
            <Button size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
