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
import CreateToken from './CreateTokenForm';
import { ProjectToken } from '../project/[id]/page';

interface AccessTableProps {
  tokens: ProjectToken[];
}

const data: Access[] = [
  {
    name: 'API Access Key',
    id: 'A1B2C3D4E5F6G7',
    date: '2024-01-15 10:23 AM',
    exp_date: '2025-01-15',
    permissions: 'Full Access',
    status: 'Active',
  },
  {
    name: 'CLI Token',
    id: 'G5H6J7K8L9M0N1',
    date: '2024-01-15 10:23 AM',
    exp_date: '2025-01-15',
    permissions: 'Read-only',
    status: 'Expired',
  },
  {
    name: 'Testing Key',
    id: 'O2P3Q4R5S6T7U8',
    date: '2024-01-15 10:23 AM',
    exp_date: '2025-01-15',
    permissions: 'Full Access',
    status: 'Active',
  },
  {
    name: 'API Analytics',
    id: 'V9W0X1Y2Z3A4B5',
    date: '2024-01-15 10:23 AM',
    exp_date: '2025-01-15',
    permissions: 'Backup Only',
    status: 'Expired',
  },
  {
    name: 'Frontend Access',
    id: 'C6D7E8F9G0H1I2',
    date: '2024-01-15 10:23 AM',
    exp_date: '2025-01-15',
    permissions: 'Read-only',
    status: 'Active',
  },
  {
    name: 'Backup Token',
    id: 'J3K4L5M6N7O8P9',
    date: '2024-01-15 10:23 AM',
    exp_date: '2025-01-15',
    permissions: 'Backup Only',
    status: 'Active',
  },
  {
    name: 'Webhook Listener',
    id: 'Q1R2S3T4U5V6W7',
    date: '2024-01-15 10:23 AM',
    exp_date: '2025-01-15',
    permissions: 'Read-only',
    status: 'Expired',
  },
  {
    name: 'Webhook Listener',
    id: 'Q1R2S3T4U5V6W7',
    date: '2024-01-15 10:23 AM',
    exp_date: '2025-01-15',
    permissions: 'Read-only',
    status: 'Expired',
  },
];

export type Access = {
  name: string;
  id: string;
  date: string;
  exp_date: string;
  permissions: 'Full Access' | 'Read-only' | 'Backup Only';
  status: 'Active' | 'Expired';
};

export const columns: ColumnDef<Access>[] = [
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
    accessorKey: 'name',
    header: 'Token name',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'id',
    header: 'Token ID',
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'date',
    header: 'Date created',
    cell: ({ row }) => <div>{row.getValue('date')}</div>,
  },
  {
    accessorKey: 'exp_date',
    header: 'Expiration date',
    cell: ({ row }) => <div>{row.getValue('exp_date')}</div>,
  },
  {
    accessorKey: 'permissions',
    header: 'Permissions',
    cell: ({ row }) => <div>{row.getValue('permissions')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const tokens = row.original;
      const status = tokens.status;
      return (
        <div className={`${status === 'Active' ? 'bg-[#17211D]' : 'bg-[#BA2543]/10'} rounded-2xl flex items-center justify-center gap-2 py-1`}>
          <p className={`${status === 'Active' ? 'text-[#027A48]' : 'text-[#BA2543]'} text-xs font-regular`}>{status}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Action',
    cell: ({ row }) => {
      const orgUsers = row.original;

      return (
        <div className='flex items-center gap-2'>
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
          <CreateToken isEditing />
        </div>
      );
    },
  },
];

export function AccessTable({ tokens }: AccessTableProps) {
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
    <div className='w-full mt-7'>
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
