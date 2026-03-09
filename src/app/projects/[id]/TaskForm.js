"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TaskForm({ projectId }) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        
        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, priority, dueDate, projectId })
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Task creation failed:", errorData);
            alert("Failed to save: " + errorData.error);
            return;
        }

        setTitle("");
        setPriority("MEDIUM");
        setDueDate("");
        router.refresh();
    };

    return <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="flex-1 min-w-62.5 rounded-md border-gray-300 shadow-sm p-2 border focus:ring-gray-900 focus:border-gray-900"
            required
        />
        <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm p-2 border focus:ring-gray-900 focus:border-gray-900 bg-white"
        />
        <select 
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm p-2 border focus:ring-gray-900 focus:border-gray-900 bg-white"
        >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
        </select>
        <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium">
            Add Task
        </button>
    </form>;
}