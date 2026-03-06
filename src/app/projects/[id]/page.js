import { redirect } from "next/navigation";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { Project } from "@/models";
import ProjectClientView from "./ProjectClientView";

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

    project._id = project._id.toString();
    
    if (project.ownerId) {
        project.ownerId = project.ownerId.toString();
    }

    return <div className="p-8 max-w-7xl mx-auto">
        <ProjectClientView project={project} />
    </div>;
}