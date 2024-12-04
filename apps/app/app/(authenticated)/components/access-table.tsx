'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';

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
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { CryptoUtils } from '@repo/design-system/lib/cryptoUtils';

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
    cell: ({ row }) => <div>{row.getValue('_id')}</div>,
  },
  {
    accessorKey: 'projectId',
    header: 'Project ID',
    cell: ({ row }) => <div>{row.getValue('projectId')}</div>,
  },
  {
    accessorKey: 'token',
    header: 'Token',
    cell: ({ row }) => <div>{row.getValue('token')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => <div>{row.getValue('createdAt')}</div>,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
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
  {
    accessorKey: 'userId',
    header: 'User ID',
    cell: ({ row }) => <div>{row.getValue('userId')}</div>,
  },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   cell: ({ row }) => {
  //     const tokens = row.original;
  //     const status = tokens.status;
  //     return (
  //       <div className={`${status === 'Active' ? 'bg-[#17211D]' : 'bg-[#BA2543]/10'} rounded-2xl flex items-center justify-center gap-2 py-1`}>
  //         <p className={`${status === 'Active' ? 'text-[#027A48]' : 'text-[#BA2543]'} text-xs font-regular`}>{status}</p>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   header: 'Action',
  //   cell: ({ row }) => {
  //     const orgUsers = row.original;

  //     return (
  //       <div className='flex items-center gap-2'>
  //         <AlertDialog>
  //           <AlertDialogTrigger asChild className='cursor-pointer'>
  //             <Trash2Icon size={18} />
  //           </AlertDialogTrigger>
  //           <AlertDialogContent className='bg-[#111015] text-white border-[#242527] font-regular'>
  //             <AlertDialogHeader>
  //               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
  //               <AlertDialogDescription>You are about to remove this dataset from your group list</AlertDialogDescription>
  //             </AlertDialogHeader>
  //             <AlertDialogFooter>
  //               <AlertDialogAction className='bg-red-700 hover:bg-red-500 border-none rounded-3xl py-2'>Yes, Delete</AlertDialogAction>
  //               <AlertDialogCancel className='bg-transparent border-[#242527] py-2 rounded-3xl'>No, Cancel</AlertDialogCancel>
  //             </AlertDialogFooter>
  //           </AlertDialogContent>
  //         </AlertDialog>
  //         <CreateToken isEditing />
  //       </div>
  //     );
  //   },
  // },
];

export function AccessTable({ projectId }: AccessTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [tokens, setTokens] = useState<ProjectToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  console.log('token access table::', token);

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

  useEffect(() => {
    const encryptedData = CryptoUtils.aesEncrypt(JSON.stringify({ id: projectId }), 'mysecurekey1234567890', 'uniqueiv12345678');

    const fetchProjectTokens = async () => {
      try {
        const response = await axios.get(`https://quikdb-core-beta.onrender.com/v/p/${encryptedData}/token`, {
          headers: {
            Authorization: token,
          },
        });
        console.log('project tokens response::', response);

        if (response.status === 200) {
          setTokens(response.data); // Set tokens to state
        } else {
          setError('Failed to fetch project tokens.');
        }
      } catch (error) {
        setError('Error fetching project tokens.');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectTokens();
    }
  }, [projectId]);


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
