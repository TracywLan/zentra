"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectForm({ project, onSuccess }) {
    const [name, setName] = useState(project?.name || "");
    const [description, setDescription] = useState(project?.description || "");
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        
        const isEditing = !!project;
        const url = isEditing ? `/api/projects/${project._id}` : "/api/projects";
        const method = isEditing ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description })
        });

        if (!isEditing) {
            setName("");
            setDescription("");
        }
        
        router.refresh();
        if (onSuccess) onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
                {project ? "Edit Project" : "Create New Project"}
            </h2>
            <div className="space-y-4 max-w-xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Project Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-gray-900 focus:border-gray-900"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-gray-900 focus:border-gray-900"
                        rows="3"
                    />
                </div>
                <div className="flex gap-3">
                    <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium">
                        {project ? "Update Project" : "Save Project"}
                    </button>
                    {project && onSuccess && <button type="button" onClick={onSuccess} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium">
                        Cancel
                    </button>}
                </div>
            </div>
        </form>
    );
}