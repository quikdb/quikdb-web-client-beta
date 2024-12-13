'use client';
import * as React from 'react';
import { useState } from 'react';
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
import { Button } from '@quikdb/design-system/components/ui/button';
import { Checkbox } from '@quikdb/design-system/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@quikdb/design-system/components/ui/table';
import Link from 'next/link';
import CreateToken from './CreateTokenForm';
import { useProjectTokens } from '@/hooks/fetchProjectTokens';
import { toast } from 'sonner';

export interface ProjectToken {
  _id: string;
  userId: string;
  projectId: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  duration: number;
  type: string;
}

interface AccessTableProps {
  projectId: string;
}

export const columns: ColumnDef<ProjectToken>[] = [
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
    accessorKey: '_id',
    header: 'Token ID',
    cell: ({ row }) => <div className='w-[150px] overflow-auto'>{row.getValue('_id')}</div>,
  },
  {
    accessorKey: 'userId',
    header: 'User ID',
    cell: ({ row }) => <div className='w-[150px] overflow-auto'>{row.getValue('userId')}</div>,
  },
  {
    accessorKey: 'projectId',
    header: 'Project ID',
    cell: ({ row }) => <div className='w-[150px] overflow-auto'>{row.getValue('projectId')}</div>,
  },
  {
    accessorKey: 'token',
    header: 'Token',
    cell: ({ row }) => <div className='w-[150px] overflow-auto'>{row.getValue('token')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <div>{row.getValue('createdAt')}</div>,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => <div>{row.getValue('updatedAt')}</div>,
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => <div>{row.getValue('duration')}</div>,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <div>{row.getValue('type')}</div>,
  },
];

export function AccessTable({ projectId }: AccessTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { tokens, isLoading, isError } = useProjectTokens(projectId);
  const {refreshTokens} = useProjectTokens(projectId);

  const deleteProjectToken = async (projectId: string) => {
    try {
      const response = await fetch('/api/delete-project-token', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) {
        toast.warning('Failed to delete Project: ' + projectId);
        return;
      }

      toast.success('Project deleted successfully: ' + projectId);
      refreshTokens();
    } catch (error) {
      console.error('Error deleting Project:', error);
    }
  };

  const table = useReactTable({
    data: tokens,
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
    <div className='w-full mt-7'>
      <div className='flex items-center relative max-md:mb-3 pb-4'>
        <CreateToken projectId={projectId} />
      </div>
      <div className='rounded-md border border-[#242527]'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='py-4 w/1/8'>
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
                    <TableCell key={cell.id} className='py-6 w-1/8'>
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
          <Link href=''>
            <Button size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
