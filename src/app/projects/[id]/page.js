import { redirect } from "next/navigation";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { Project, Task } from "@/models";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList.js";
import Link from "next/link";


export default async function ProjectDetailsPage({ params }) {
    const session = await auth();
    
    if (!session) {
        redirect("/login");
    }

    await dbConnect();
    const { id } = await params;
    
    const project = await Project.findOne({ 
        _id: id, 
        ownerId: session.user.id 
    }).lean();

    if (!project) {
        redirect("/projects");
    }

    const tasks = await Task.find({ projectId: id }).sort({ createdAt: -1 }).lean();

    project._id = project._id.toString();
    
    if (project.ownerId) {
        project.ownerId = project.ownerId.toString();
    }

    const serializedTasks = tasks.map(task => ({
        ...task,
        _id: task._id.toString(),
        projectId: task.projectId.toString(),
        assignedToId: task.assignedToId ? task.assignedToId.toString() : null,
        createdAt: task.createdAt ? task.createdAt.toISOString() : null,
        updatedAt: task.updatedAt ? task.updatedAt.toISOString() : null,
        dueDate: task.dueDate ? task.dueDate.toISOString() : null
    }));
    
    return <div className="p-8">
        <div className="max-w-7xl mx-auto">
            <header className="mb-8">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/projects" >
                        Back to Projects
                    </Link>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                    {project.name}
                </h1>
                <p className="text-gray-500 mt-2">{project.description}</p>
            </header>

            <TaskForm projectId={id} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-12">Tasks</h2>
            
            <TaskList initialTasks={serializedTasks} />
        </div>
    </div>;
}