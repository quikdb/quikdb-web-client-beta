'use client'; 
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Checkbox } from "../../components/ui/checkbox"
import { Input } from "../../components/onboarding"
import { ArrowLeftCircle } from "lucide-react"
// import { useNavigate } from "react-router-dom"

const roles = [
    {
        name: "Project Owner",
        description: "Provides full access to the current organization. A user can access all data, database, and projects in the organization"
    },
    {
        name: "Database Data Reader/Writer",
        description: "Provides reads and write access to data on any database in the project"
    },
    {
        name: "Project Manager",
        description: "Provides full access to the current organization. A user can access all data, database, and projects in the organization"
    },
    {
        name: "Database Data Reader",
        description: "Provides full access to the current organization. A user can access all data, database, and projects in the organization"
    },
    {
        name: "Project Viewer",
        description: "Provides read-only access to all databases and App Services in the project. A collaborator can’t access its a database or access its data"
    },
]

const AddCollaborators = () => {
    // const navigate = useNavigate()
    return (
        <div className="mt-10">
            <ArrowLeftCircle className="text-gray-300 mb-7 cursor-pointer"  />
            {/* <ArrowLeftCircle className="text-gray-300 mb-7 cursor-pointer" onClick={() => navigate(-1)} /> */}
            <p className="text-xl font-satoshi_medium">Add Collaborators</p>

            <div className="text-sm mt-5 flex flex-col gap-3">
                <p>Users</p>
                <Input placeholder="Select collaborators..." className="border border-[#242527] py-5" />
                <p>You can add multiple users with the same roles</p>
            </div>

            <div className="mt-5 flex flex-col gap-7">
                <div>
                    <p className="text-xl">Project Roles</p>
                    <p className="text-gray-400 text-base">Select the roles you want to assign to new user.</p>
                </div>

                <div className="flex flex-wrap gap-4 justify-between">
                    {roles.map((role, index) => (
                        <Card key={index} className="bg-[#151418] text-white border-[#242527] p-5 w-[49%]">
                            <div className="flex items-center justify-between">
                                <p>{role.name}</p>
                                <Checkbox className="border-gray-400" />
                            </div>
                            <p className="text-gray-400 text-sm mt-3">{role.description}</p>
                        </Card>
                    ))}
                </div>

                <div className="flex gap-4">
                    <Button size="lg" className="bg-gradient w-fit px-4 text-[#0F1407]">
                        Add
                    </Button>
                    <Button size="lg" variant="outline" className="bg-transparent text-gradient w-fit px-4 border-[#242527]">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddCollaborators