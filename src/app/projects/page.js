import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";


export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    await dbConnect();

    const rawProjects = await Project.find({ userId: session.user.id }).lean();
    const projects = rawProjects.map((projects) => ({
        ...projects,
        _id: projects._id.toString(),
        userId: projects.userId.toString(),
    }));
    


return (
    <main>
        <h1>
            Projects
        </h1>
        <ProjectList projects={projects} />
    </main>
);
}