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
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
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
} from '../../components/ui/alert-dialog';
import Link from 'next/link';
import { Trash2Icon } from 'lucide-react';

const data: Database[] = [
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Creator', 'Project Owner', 'Organization Owner', 'Project Owner'],
    projectRoles: 'Project Owner',
    emailStatus: 'Verified',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner', 'Project Owner'],
    projectRoles: 'Project Owner',
    emailStatus: 'Pending',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner', 'Project Owner', 'Organization Owner'],
    projectRoles: 'Project Owner',
    emailStatus: 'Rejected',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner'],
    projectRoles: 'Project Owner',
    emailStatus: 'Verified',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner', 'Project Owner', 'Project Owner'],
    projectRoles: 'Project Owner',
    emailStatus: 'Pending',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner', 'Organization Owner'],
    projectRoles: 'Project Owner',
    emailStatus: 'Rejected',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner', 'Project Owner', 'Project Owner'],
    projectRoles: 'Project Owner',
    emailStatus: 'Verified',
  },
  {
    name: 'Tanner Finsha',
    email: 'tannerfinsha@gmail.com',
    orgRoles: ['Project Owner', 'Project Owner', 'Project Owner'],
    projectRoles: 'Project Owner',
    emailStatus: 'Verified',
  },
];

export type Database = {
  name: string;
  email: string;
  orgRoles: string[];
  projectRoles: string;
  emailStatus: 'Verified' | 'Pending' | 'Rejected';
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
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const orgUsers = row.original;
      return (
        <div>
          <div className='text-base'>{orgUsers.name}</div>
          <div className='text-gray-400 text-sm mt-1'>{orgUsers.email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'emailStatus',
    header: 'Email Status',
    cell: ({ row }) => {
      const orgUsers = row.original;
      const status = orgUsers.emailStatus;
      return (
        <div
          className={`${status === 'Verified' ? 'bg-[#17211D]' : status === 'Pending' ? 'bg-[#FFB422]/10' : 'bg-[#BA2543]/10'} rounded-2xl flex items-center justify-center gap-2 py-1`}
        >
          <div
            className={`${status === 'Verified' ? 'bg-[#12B76A]' : status === 'Pending' ? 'bg-[#FFB422]' : 'bg-[#CB4862]'} w-1 h-1 rounded-full`}
          ></div>
          <div
            className={`${status === 'Verified' ? 'text-[#027A48]' : status === 'Pending' ? 'text-[#FFB422]' : 'text-[#BA2543]'} text-xs font-satoshi_regular`}
          >
            {status}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'orgRoles',
    header: 'Organization Roles',
    cell: ({ row }) => {
      const orgUsers = row.original;
      const orgRoles = orgUsers.orgRoles;
      return (
        <div className='flex gap-3'>
          {orgRoles.map((role, index) => (
            <div
              key={index}
              className={`${role === 'Organization Owner' ? 'bg-[#513542]' : 'bg-[#2F2F35]'} text-gray-400 font-satoshi_regular rounded-xl w-fit px-3 py-1`}
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
      <div className='bg-[#2F2F35] text-gray-400 font-satoshi_regular rounded-xl w-fit px-3 py-1'>{row.getValue('projectRoles')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Action',
    cell: ({ row }) => {
      const orgUsers = row.original;
      console.log(orgUsers.name);

      return (
        <AlertDialog>
          <AlertDialogTrigger asChild className='cursor-pointer'>
            <Trash2Icon size={18} />
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-[#111015] text-white border-[#242527] font-satoshi_regular'>
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

export function OrgUsersTable() {
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
          <TableBody className='font-satoshi_light'>
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