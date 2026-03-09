import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { Task } from "@/models";

export async function GET(req) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();

        const { searchParams } = new URL(req.url);
        const projectId = searchParams.get("projectId");

        if (!projectId) {
            return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
        }

        const tasks = await Task.find({ projectId }).sort({ createdAt: -1 });

        return NextResponse.json(tasks);
    } catch (error) {
        console.error("GET Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const body = await req.json();

        if (!body.projectId || !body.title) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const task = await Task.create({
            title: body.title,
            description: body.description,
            priority: body.priority || "MEDIUM",
            status: body.status || "TODO",
            dueDate: body.dueDate,
            projectId: body.projectId,
            assignedToId: session.user.id 
        });

        return NextResponse.json(task);
    } catch (error) {
        console.error("POST Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}