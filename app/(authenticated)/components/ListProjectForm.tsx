import { Button } from '@quikdb/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@quikdb/design-system/components/ui/dialog';
import { CheckCircle, DollarSign, Star } from 'lucide-react';
import { Label } from '@quikdb/design-system/components/ui/label';
import { useState } from 'react';
import { DatabaseVersion } from '@/@types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks';

export default function ListProject() {
  const [isCreating, setIsCreating] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<DatabaseVersion>(DatabaseVersion.FREE);

  const router = useRouter();
  const { refreshProjects } = useProjects();

  const handleCreateProject = async (version: DatabaseVersion) => {
    if (!projectName) {
      setError('Project name is required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/create-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName, databaseVersion: version }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setSuccess(true);
        setProjectName('');
        setIsCreating(false);
        refreshProjects();

        const createdProjectId = result.data.projectData.data._id;
        setProjectId(createdProjectId);

        if (version === DatabaseVersion.FREE) {
          toast.success('Free project created successfully!');
        } else {
          router.push(`/checkout/${createdProjectId}/${version}`);
        }
      } else {
        toast.warning(result.message || 'Failed to create project. Please try again later.');
        setError(result.message || 'Failed to create project. Please try again later.');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleVersionSelection = (version: DatabaseVersion) => {
    setSelectedVersion(version);
  };

  return (
    <>
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogTrigger asChild>
          <Button size="lg" className="bg-gradient w-fit px-4 text-[#0F1407] max-md:scale-90 max-md:text-right">
            List new project
          </Button>
        </DialogTrigger>
        <DialogContent className="s:max-w-[425px] bg-[#111015] text-white border-[#242527] font-regular">
          <DialogHeader>
            <DialogTitle className="font-medium">List Project</DialogTitle>
            <DialogDescription>Create a new project</DialogDescription>
          </DialogHeader>
          <hr className="border-gray-400" />
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <input
                type="text"
                placeholder="Enter Project Name"
                className="px-4 py-2 border rounded-md w-full"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="name">Database Version</Label>
            <DialogDescription className="mb-2">Select the version of the database you want to use.</DialogDescription>
            <Button
              onClick={() => handleVersionSelection(DatabaseVersion.FREE)}
              className={`hover:bg-gradient ${selectedVersion === DatabaseVersion.FREE ? 'bg-gradient text-black' : ''}`}
            >
              Free <CheckCircle />
            </Button>
            <Button
              onClick={() => handleVersionSelection(DatabaseVersion.PROFESSIONAL)}
              className={`hover:bg-gradient ${selectedVersion === DatabaseVersion.PROFESSIONAL ? 'bg-gradient text-black' : ''}`}
            >
              Professional <Star />
            </Button>
            <Button
              onClick={() => handleVersionSelection(DatabaseVersion.PREMIUM)}
              className={`hover:bg-gradient ${selectedVersion === DatabaseVersion.PREMIUM ? 'bg-gradient text-black' : ''}`}
            >
              Premium <DollarSign />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              size="lg"
              className={`font-medium bg-gradient px-4 w-fit text-[#0F1407] ${!selectedVersion ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleCreateProject(selectedVersion!)}
              disabled={!selectedVersion || loading}
            >
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
