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
import { Button } from '@repo/design-system/components/ui/button';
import { Checkbox } from '@repo/design-system/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/design-system/components/ui/table';
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
import { Trash2Icon } from 'lucide-react';

const data: Database[] = [
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Creator', 'Project Owner', 'Organization Owner', 'Project Owner'],
    projectRoles: 'Project Owner',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner', 'Project Owner'],
    projectRoles: 'Project Owner',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner', 'Project Owner', 'Organization Owner'],
    projectRoles: 'Project Owner',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner'],
    projectRoles: 'Project Owner',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner', 'Project Owner', 'Project Owner'],
    projectRoles: 'Project Owner',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner', 'Organization Owner'],
    projectRoles: 'Project Owner',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner', 'Project Owner', 'Project Owner'],
    projectRoles: 'Project Owner',
  },
];

export type Database = {
  name: string;
  email: string;
  orgRoles: string[];
  projectRoles: string;
};

export const columns: ColumnDef<Database>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className='ml-5 border-gray-500'
        checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? 'indeterminate' : false}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox className='ml-5 border-gray-500' checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const collaborators = row.original;
      return (
        <div>
          <div className='text-base max-md:text-sm'>{collaborators.name}</div>
          <div className='text-gray-400 text-sm max-md:text-xs mt-1'>{collaborators.email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'orgRoles',
    header: 'Organization Roles',
    cell: ({ row }) => {
      const collaborators = row.original;
      const orgRoles = collaborators.orgRoles;
      return (
        <div className='flex gap-3'>
          {orgRoles.map((role, index) => (
            <div
              key={index}
              className={`${role === 'Organization Owner' ? 'bg-[#513542]' : 'bg-[#2F2F35]'} text-gray-400 font-regular max-md:text-xs rounded-xl w-fit px-3 py-1`}
            >
              {role}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'projectRoles',
    header: 'Project Roles',
    cell: ({ row }) => (
      <div className='bg-[#2F2F35] text-gray-400 font-regular max-md:text-xs rounded-xl w-fit px-3 py-1'>{row.getValue('projectRoles')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Action',
    cell: ({ row }) => {
      const collaborators = row.original;
      console.log(collaborators.name);

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

export function CollaboratorsTable() {
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
      <div className='rounded-md border border-[#242527]'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='py-4'>
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
                    <TableCell key={cell.id} className='py-6'>
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
