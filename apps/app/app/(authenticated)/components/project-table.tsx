'use client';
import React from 'react';
import { ColumnDef, SortingState, useReactTable, flexRender, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/design-system/components/ui/table';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@repo/design-system/components/ui/dropdown-menu';

type Project = {
  _id: string;
  name: string;
  createdAt: string;
  owner: string;
  isActive: boolean;
};

interface ProjectTableProps {
  projects: Project[];
}

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'name',
    header: 'Project Name',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => <div>{new Date(row.getValue('createdAt')).toLocaleString()}</div>,
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
    cell: ({ row }) => <div>{row.getValue('owner')}</div>,
  },
  {
    accessorKey: 'isActive',
    header: 'Active Status',
    cell: ({ row }) => <div>{row.getValue('isActive') ? 'Active' : 'Inactive'}</div>,
  },
  {
    accessorKey: '_id',
    header: 'Project ID',
    cell: ({ row }) => <div>{row.getValue('_id')}</div>,
  },
];

export function ProjectTable({ projects }: ProjectTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: projects,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className='w-full'>
      <div className='flex items-center pt-7 pb-5'>
        <Input
          placeholder='Search by Project name...'
          value={(table.getColumn('project')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('project')?.setFilterValue(event.target.value)}
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
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='py-4 first:px-8'>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='font-light'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className='hover:bg-blacko'>
                  <Link href={`/project/${row.getValue('_id')}`} passHref>
                    <TableCell className='py-6 cursor-pointer px-10'>
                      {flexRender(row.getVisibleCells()[0]?.column.columnDef.cell, row.getVisibleCells()[0]?.getContext())}
                    </TableCell>
                  </Link>
                  {row
                    .getVisibleCells()
                    .slice(1)
                    .map((cell) => (
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
        <div className='space-x-2'>
          <Button size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
