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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@quikdb/design-system/components/ui/dialog';
import CreateToken from './CreateTokenForm';
import { useProjectTokens } from '@/hooks/fetchProjectTokens';
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
import { ClipboardCheck, ClipboardCopy, Trash2Icon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';


export interface Project {
  _id: string;
  name: string;
  owner: string;
  databaseVersion: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectToken {
  _id: string;
  userId: string;
  projectId: Project;
  token: string;
  createdAt: string;
  updatedAt: string;
  duration: number;
  type: string;
}

interface AccessTableProps {
  projectId: string;
}

export function AccessTable({ projectId }: AccessTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { tokens, isLoading, isError } = useProjectTokens(projectId);
  const { refreshTokens } = useProjectTokens(projectId);
  const [showFreePopup, setShowFreePopup] = useState(false);
  const { isInternetIdentity, internetIdentityCLI, userEmail } = useSelector((state: RootState) => state.auth); // Access Redux state
  const firstPartEmail = userEmail ? userEmail.split('-')[0] : '';
  const Email = userEmail ? userEmail : '';
  const firstName =  userEmail ? userEmail.split('@')[0] : '';
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null); // Track the copied command

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    toast.success('Command copied to clipboard!');
    setTimeout(() => setCopiedCommand(null), 2000);
  };

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

      toast.success('Project token deleted successfully: ' + projectId);
      refreshTokens();
    } catch (error) {
      console.error('Error deleting Project:', error);
    }
  };

  const columns: ColumnDef<ProjectToken>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          className="ml-5"
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
              ? 'indeterminate'
              : false
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="ml-5"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'token',
      header: 'Token ID',
      cell: ({ row }) => {
        const token = row.getValue('token') as string;
        const [copied, setCopied] = React.useState(false);
  
        const handleCopy = () => {
          navigator.clipboard.writeText(token);
          setCopied(true);
          toast.success('Token copied to clipboard!');
  
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        };
  
        return (
          <div className="flex items-center w-[150px]">
            <span className="truncate">{token}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2"
              onClick={handleCopy}
              aria-label={copied ? 'Token copied' : 'Copy token'}
            >
              {copied ? (
                <ClipboardCheck className="h-4 w-4 text-green-500" />
              ) : (
                <ClipboardCopy className="h-4 w-4 text-gray-500 hover:text-gray-700" />
              )}
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: '_id',
      header: 'ID',
      cell: ({ row }) => (
        <div className="w-[150px] overflow-auto">{row.getValue('_id')}</div>
      ),
    },
    {
      accessorKey: 'projectId',
      header: 'Project ID',
      cell: ({ row }) => {
        const project = row.getValue('projectId') as Project;
        return (
          <div>
            <span>{project._id}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'projectId',
      header: 'Database Version',
      cell: ({ row }) => {
        const project = row.getValue('projectId') as Project;
        return (
          <div>
            <span>{project.databaseVersion}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'projectId',
      header: 'Is Active',
      cell: ({ row }) => {
        const project = row.getValue('projectId') as Project;
        return <div>{project.isActive ? 'Yes' : 'No'}</div>;
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => <div>{row.getValue('createdAt')}</div>,
    },
    {
      id: 'duration',
      header: 'Show Config',
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFreePopup(true)}
        >
          Show Config
        </Button>
      ),
    },    
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const tokenId = row.getValue('_id') as string;
  
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild className="cursor-pointer">
              <Trash2Icon size={18} />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#111015] text-white border-[#242527] font-regular">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  {`You are about to delete the token with ID "${tokenId}". This action cannot be undone.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  className="bg-red-700 hover:bg-red-500 border-none rounded-3xl py-2"
                  onClick={() => deleteProjectToken(tokenId)}
                >
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

      {showFreePopup && (
        <Dialog open={showFreePopup} onOpenChange={setShowFreePopup}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Setup Instructions</DialogTitle>
              <DialogDescription>
                You have successfully created your project token on the free plan.
                <br />
                Run the following commands to configure your project:
                <pre className="bg-gray-800 text-white p-4 rounded mt-4 whitespace-pre-wrap break-words">
                  <code>
                    {[
                      'npm i -g quikdb-cli-beta',
                      isInternetIdentity
                        ? `quikdb config -u ${firstPartEmail} -i ${internetIdentityCLI}`
                        : `quikdb config -u ${firstName} -e ${Email}`,
                      'quikdb install',
                    ].map((command, index) => (
                      <div key={index} className="mb-2">
                        <span>{command}</span>
                        <button
                          className="ml-4 p-2 rounded hover:bg-gray-700"
                          onClick={() => handleCopy(command)}
                          aria-label={copiedCommand === command ? 'Command copied' : 'Copy command'}
                        >
                          {copiedCommand === command ? (
                            <ClipboardCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <ClipboardCopy className="h-4 w-4 text-gray-500 hover:text-gray-300" />
                          )}
                        </button>
                      </div>
                    ))}
                  </code>
                </pre>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
