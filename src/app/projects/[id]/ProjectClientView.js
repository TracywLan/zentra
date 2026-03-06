"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "../ProjectForm";

export default function ProjectClientView({ project }) {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this project?");
        if (!confirmed) return;

        await fetch(`/api/projects/${project._id}`, {
            method: "DELETE",
        });
        
        router.push("/projects");
        router.refresh();
    };

    if (isEditing) {
        return <ProjectForm 
            project={project} 
            onSuccess={() => setIsEditing(false)} 
        />;
    }

    return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <div className="flex gap-3">
                <button 
                    onClick={() => setIsEditing(true)} 
                    className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                    Edit
                </button>
                <button 
                    onClick={handleDelete} 
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors font-medium"
                >
                    Delete
                </button>
            </div>
        </div>
        <p className="text-gray-600 text-lg whitespace-pre-wrap">{project.description}</p>
    </div>;
}