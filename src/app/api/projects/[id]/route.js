import dbConnect from "@/lib/mongo";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function DELETE(req, { params }) {
    await dbConnect();
    const session = await auth();

    if(!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    await Project.findOneAndDelete({
        _id: params.id,
        owner: session.user.id
    });

    return new Response(JSON.stringify({ message: "Deleted" }))
}

export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const data = await request.json();

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { name: data.name, description: data.description },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json(updatedProject, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}