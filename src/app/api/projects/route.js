import dbConnect from "@/lib/mongo";
import Project from "@/models/Project";
import { auth } from "@/auth";

export async function GET() {
    await dbConnect();
    const session = await auth();

    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        });
    }

    const projects = await Project.find({ owner: session.user.id });

    return new Response(JSON.stringify(projects));
}

export async function POST(req) {
    await dbConnect();
    const session = await auth();

    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        });
    }

    const { name, description } = await req.json();

    const project = await Project.create({
        name,
        description,
        owner: session.user.id,
    });

    return new Response(JSON.stringify(project), { status: 201 });
}