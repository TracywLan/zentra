"use client";

import { useState, useEffect } from "react";

export default function ProjectForm({ project, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({ name: "", description: "" });

    useEffect(() => {
        if (project) {
            setFormData({ name: project.name, description: project.description });
        } else {
            setFormData({ name: "", description: "" });
        }
    }, [project]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!formData.name) return;

        const isEditing = !!project;
        const url = isEditing ? `/api/projects/${project._id}` : "/api/projects";
        const method = isEditing ? "PUT" : "POST";

        try {
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            setFormData({ name: "", description: "" });
            onSuccess();
        } catch {
            console.error("Failed to save project");
        }
    };

    return <form onSubmit={handleSubmit} className="mb-8 border p-6 bg-gray-50 max-w-md rounded shadow-sm">
        <h2 className="text-xl mb-4 font-semibold">
            {project ? "Edit Project" : "New Project Details"}
        </h2>
        
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-700">Project Name</label>
            <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>
        
        <div className="mb-6">
            <label className="block text-sm font-bold mb-2 text-gray-700">Description</label>
            <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
            />
        </div>
        
        <div className="flex gap-3">
            <button 
                type="submit" 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                {project ? "Update Project" : "Save Project"}
            </button>
            <button 
                type="button" 
                onClick={onCancel} 
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
                Cancel
            </button>
        </div>
    </form>;
}