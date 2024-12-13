'use client';
import React from 'react';
import { ColumnDef, SortingState, useReactTable, flexRender, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { ChevronDown, Trash2Icon } from 'lucide-react';
import { Button } from '@quikdb/design-system/components/ui/button';
import { Input } from '@quikdb/design-system/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@quikdb/design-system/components/ui/table';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@quikdb/design-system/components/ui/dropdown-menu';
import { toast } from 'sonner';
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
import { useProjects } from '@/hooks';

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

export function ProjectTable({ projects }: ProjectTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns: ColumnDef<Project>[] = [
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
      header: 'Actions',
      cell: ({ row }) => {
        const projectId = row.getValue('_id') as string;
        const Name = row.getValue('name') as string;
        return (
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild className='cursor-pointer'>
                <Trash2Icon size={18} />
              </AlertDialogTrigger>
              <AlertDialogContent className='bg-[#111015] text-white border-[#242527] font-regular'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>{`You are about to remove this ${Name} project from your list.`}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction className='bg-red-700 hover:bg-red-500 border-none rounded-3xl py-2' onClick={() => deleteProject(projectId)}>
                    Yes, Delete
                  </AlertDialogAction>
                  <AlertDialogCancel className='bg-transparent border-[#242527] py-2 rounded-3xl'>No, Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  const { refreshProjects } = useProjects();

  const deleteProject = async (projectId: string) => {
    try {
      const response = await fetch('/api/delete-project', {
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
      refreshProjects();
    } catch (error) {
      console.error('Error deleting Project:', error);
    }
  };
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
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='py-6 px-10'>
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
