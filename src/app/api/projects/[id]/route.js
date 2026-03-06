import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { Project } from "@/models";

export async function GET(req, { params }) {
    const session = await auth();

    if(!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status:401 });
    }

    await dbConnect();
    const { id } = await params;

    const project = await Project.findOne({ 
        _id: id,
        ownerId: session.user.id,
    });

    if(!project) {
        return NextResponse.json({ error: "Project not found" }, {status: 404 });
    }

    return NextResponse.json(project);
}

export async function PUT(req, { params }) {
        const session = await auth();
    
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    
    const { id } = await params;
    const body = await req.json();

    const project = await Project.findOneAndUpdate(
        { _id: id, ownerId: session.user.id },
        { name: body.name, description: body.description },
        { new: true, runValidators: true },
    );

    if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
}

export async function DELETE(req, { params }) {
    const session = await auth();
    
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    
    const { id } = await params;

    const project = await Project.findOneAndDelete({
        _id: id,
        ownerId: session.user.id
    });

    if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}