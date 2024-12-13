import { useState } from 'react';
import { Card } from '@quikdb/design-system/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@quikdb/design-system/components/ui/accordion';
import { Input } from '@quikdb/design-system/components/ui/input';
import { Label } from '@quikdb/design-system/components/ui/label';
import { Search, Trash2Icon } from 'lucide-react';
import CreateSchema from './CreateSchemaForm';
import AddDataGroup from './AddDataGroupForm';
import { useSchemas } from '@/hooks';
import { DatabaseTable } from './database-table';
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

const Schema = () => {
  const { schemas, refreshSchemas } = useSchemas();

  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [schema, setSchema] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [schemaAttributes, setSchemaAttributes] = useState<any[]>([]);
  const [schemaIndexes, setSchemaIndexes] = useState<string[]>([]);
  const [showSchemaDetails, setShowSchemaDetails] = useState(false);

  const [databaseTableProps, setDatabaseTableProps] = useState<{
    schemaName: string | null;
    schemaData: any[];
    schemaIndexes: string[];
  }>({
    schemaName: null,
    schemaData: [],
    schemaIndexes: [],
  });

  const fetchSchema = async (schemaName: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/get-schema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schemaName }),
      });

      if (!response.ok) {
        toast.warning('Failed to fetch schema: ' + schemaName);
        return;
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setSchema(data);
        setSchemaAttributes(data[0]?.fields || []);
        setSchemaIndexes(data[0]?.indexes || []);
        setSelectedSchema(schemaName);
        setShowSchemaDetails(true);
      } else {
        toast.warning('No schema found for: ' + schemaName);
      }
    } catch (error) {
      console.error('Error fetching schema data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSchemaData = async (schemaName: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/get-schema-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schemaName }),
      });

      if (!response.ok) {
        toast.warning('Failed to fetch schema data: ' + schemaName);
        return;
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setDatabaseTableProps({
          schemaName,
          schemaData: data,
          schemaIndexes: schemaIndexes,
        });

        setShowSchemaDetails(false);
      } else {
        toast.warning('No data found in: ' + schemaName);
      }
    } catch (error) {
      console.error('Error fetching schema data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSchema = async (schemaName: string) => {
    try {
      const response = await fetch('/api/delete-schema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schemaName }),
      });

      if (!response.ok) {
        toast.warning('Failed to delete schema: ' + schemaName);
        return;
      }

      toast.success('Schema deleted successfully: ' + schemaName);
      refreshSchemas();
    } catch (error) {
      console.error('Error deleting schema:', error);
    }
  };

  const renderSchemaAsDocumentFormat = (schema: any[]) => {
    return schema
      .map((schema: any) => {
        return `{
    "schemaName": "${schema.schemaName}",
    "createdAt": "${schema.createdAt}",
    "fields": [
      ${schema.fields
        .map((field: any) => {
          return `{
        "fieldName": "${field.name}",
        "type": "${field.fieldType}"
      }`.trim();
        })
        .join(',\n')}
    ],
    "indexes": ${JSON.stringify(schema.indexes)}
  }`.trim();
      })
      .join(',\n\n');
  };

  return (
    <Card className='bg-[#151418] text-white border-[#242527] p-10 max-md:py-5 px-5 flex max-md:flex-col gap-10 mt-5'>
      <div className='flex flex-col gap-5 pr-10 border-r border-r-[#242527]'>
        <CreateSchema />
        <div className='flex relative'>
          <Label className='absolute top-2.5 left-4 text-gray-400'>
            <Search size={14} />
          </Label>
          <Input placeholder='Search by DB name...' className='pl-10' />
        </div>

        <Accordion type='single' collapsible className='w-full max-md:flex flex-wrap'>
          {schemas && schemas.length > 0 ? (
            schemas.map((schemaName: string, index: number) => (
              <AccordionItem key={index} value={`item-${index}`} className='w-full'>
                <AccordionTrigger
                  onClick={() => {
                    setSelectedSchema(schemaName);
                    fetchSchemaData(schemaName);
                  }}
                >
                  <button className='flex items-center justify-between lg:w-[14vw] max-md:gap-52 w-fit'>
                    <p className='text-base'>{schemaName.charAt(0).toUpperCase() + schemaName.slice(1)}</p>
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className='cursor-pointer'>
                            <Trash2Icon size={18} />
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className='bg-[#111015] text-white border-[#242527] font-regular'>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>You are about to remove this dataset from your group list.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogAction
                              className='bg-red-700 hover:bg-red-500 border-none rounded-3xl py-2'
                              onClick={() => deleteSchema(schemaName)}
                            >
                              Yes, Delete
                            </AlertDialogAction>
                            <AlertDialogCancel className='bg-transparent border-[#242527] py-2 rounded-3xl'>No, Cancel</AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </button>
                </AccordionTrigger>
                <AccordionContent className='w-full flex flex-col gap-3 pl-6'>
                  <button
                    className='text-sm text-[#72F5DD] underline'
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchSchema(schemaName);
                    }}
                  >
                    View Full Schema
                  </button>
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <p>No schemas found</p>
          )}
        </Accordion>
      </div>

      <div className='w-full'>
        <div className='flex max-md:flex-col max-md:gap-3 justify-between'>
          <div className='flex flex-col gap-1'>
            <p className='font-medium text-xl'>Schema Data</p>
            <p className='font-light text-xs text-gray-400'>List of data groups with the schema</p>
          </div>
          <AddDataGroup attributes={schemaAttributes} selectedSchema={selectedSchema} />
        </div>
        {loading ? (
          <p>Loading schema data...</p>
        ) : showSchemaDetails ? (
          <div className='pt-4'>
            <h2 className='text-lg font-medium mb-4'>{`${(selectedSchema ?? '').charAt(0).toUpperCase() + (selectedSchema ?? '').slice(1).toLowerCase()} Schema`}</h2>{' '}
            {schema && schema.length > 0 ? (
              <pre className='bg-gray-900 text-white p-4 rounded mt-4'>{renderSchemaAsDocumentFormat(schema)}</pre>
            ) : (
              <p>No data available for this schema.</p>
            )}
          </div>
        ) : (
          <DatabaseTable
            data={databaseTableProps.schemaData}
            schemaIndex={databaseTableProps.schemaIndexes}
            schemaName={databaseTableProps.schemaName}
          />
        )}
      </div>
    </Card>
  );
};

export default Schema;
