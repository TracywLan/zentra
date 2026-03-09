import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { Task } from "@/models";

export async function PUT(req, { params }) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        
        const { id } = await params;
        const body = await req.json();

        const task = await Task.findByIdAndUpdate(
            id,
            { $set: body },
            { returnDocument: 'after', runValidators: true }
        );

        if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
        
        return NextResponse.json(task);
    } catch (error) {
        console.error("PUT Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        
        const { id } = await params;

        const task = await Task.findByIdAndDelete(id);

        if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}