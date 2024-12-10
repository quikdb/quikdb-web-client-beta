import { useState } from 'react';
import { Card } from '@repo/design-system/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/design-system/components/ui/accordion';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { EllipsisVertical, Search } from 'lucide-react';
import CreateDatabase from './CreateSchemaForm';
import AddDataGroup from './AddDataGroupForm';
import { useSchemas } from '@/hooks';

const Schema = () => {
  const { schemas } = useSchemas();
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [schemaData, setSchemaData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSchemaData = async (schemaName: string) => {
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
        console.error('Failed to fetch schema data:', await response.text());
        return;
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setSchemaData(data);
        setSelectedSchema(schemaName);
      } else {
        console.warn('No schema data found for:', schemaName);
      }
    } catch (error) {
      console.error('Error fetching schema data:', error);
    } finally {
      setLoading(false);
    }
  };

  const convertBigIntToString = (data: any) => {
    if (typeof data === 'object' && data !== null) {
      for (const key in data) {
        if (data[key] instanceof BigInt) {
          data[key] = data[key].toString();
        } else if (typeof data[key] === 'object') {
          convertBigIntToString(data[key]);
        }
      }
    }
  };

  const renderSchemaAsDocumentFormat = (schemaData: any[]) => {
    return schemaData.map((schema: any) => {
      convertBigIntToString(schema);

      return `{
    "schemaName": "${schema.schemaName}",
    "createdAt": "${schema.createdAt}",
    "fields": [
      ${schema.fields.map((field: any) => {
        return `{
        "fieldName": "${field.name}",
        "type": "${field.fieldType}"
      }`.trim();
      }).join(',\n')}
    ],
    "indexes": ${JSON.stringify(schema.indexes)}
  }`.trim();
    }).join(',\n\n');
  };

  return (
    <Card className='bg-[#151418] text-white border-[#242527] p-10 max-md:py-5 px-5 flex max-md:flex-col gap-10 mt-5'>
      <div className='flex flex-col gap-5 pr-10 border-r border-r-[#242527]'>
        <CreateDatabase />
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
              <AccordionTrigger>
                <div className='flex items-center justify-between lg:w-[14vw] max-md:gap-52 w-fit'>
                  <p className='text-base'>{schemaName.charAt(0).toUpperCase() + schemaName.slice(1)}</p>
                  <EllipsisVertical size={16} className='text-gray- max-md:' />
                </div>
              </AccordionTrigger>
              <AccordionContent className='w-full flex flex-col gap-3 pl-10'>
                <button className='text-sm text-blue-500 underline' onClick={() => fetchSchemaData(schemaName)}>
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
          <AddDataGroup />
        </div>
        {loading ? (
          <p>Loading schema data...</p>
        ) : selectedSchema ? (
          <div className='pt-4'>
            <h2 className='text-lg font-medium mb-4'>
              {`${selectedSchema?.charAt(0).toUpperCase() + selectedSchema?.slice(1).toLowerCase()} Schema`}
            </h2>
            {schemaData && schemaData.length > 0 ? (
              <pre className='bg-gray-800 text-white p-4 rounded mt-4'>
                {renderSchemaAsDocumentFormat(schemaData)}
              </pre>
            ) : (
              <p>No data available for this schema.</p>
            )}
          </div>
        ) : (
          <p>Select a schema to view its details.</p>
        )}
      </div>
    </Card>
  );
};

export default Schema;
