import { redirect } from "next/navigation";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import Link from "next/link";
import { Project } from "@/models";
import ProjectForm from "./ProjectForm";
import AddProjectToggle from "./AddProjectToggle";


export default async function ProjectsPage() {
    const session = await auth();
    
    if (!session) {
        redirect("/login");
    }

    await dbConnect();
    const projects = await Project.find({ ownerId: session.user.id }).lean();

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Your Projects</h1>
                </div>
                </header>

                <AddProjectToggle />

                <div className="col-span-full flex flex-col gap-4">
                    {projects.map(project => (
                        <Link href={`/projects/${project._id.toString()}`} key={project._id.toString()} className="block">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer h-full">
                                <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                                <p className="text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}