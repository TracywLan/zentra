import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { Project } from "@/models";

export async function GET(req) {
    const session = await auth();

    if(!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect();

    const projects = await Project.find({ ownerId: session.user.id });

    return NextResponse.json(projects)
}

export async function POST(req) {
    try {
    const session = await auth();
    
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    const project = await Project.create({
        name: body.name,
        description: body.description,
        ownerId: session.user.id
    });

    return NextResponse.json(project);
} catch (error) {
    console.error("POST Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}
