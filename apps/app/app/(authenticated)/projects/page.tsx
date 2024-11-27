import ListProject from "../components/ListProjectForm"
import { ProjectTable } from "../components/project-table"

const Projects = () => {
    return (
        <div className="mt-10">
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <p className="font-satoshi_medium text-3xl">Projects</p>
                    <p className="font-satoshi_light text-base text-gray-400">Real-time overview of your listed projects</p>
                </div>
                <ListProject />
            </div>
            <div>
                <ProjectTable />
            </div>
        </div>
    )
}

export default Projects