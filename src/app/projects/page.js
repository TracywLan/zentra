"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectForm from "@/components/ProjectForm";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const loadProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch {
            console.error("Failed to load projects");
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleCreateNew = () => {
        setEditingProject(null);
        setIsFormOpen(true);
    };

    const handleEdit = project => {
        setEditingProject(project);
        setIsFormOpen(true);
    };

    const handleFormSuccess = async () => {
        setIsFormOpen(false);
        setEditingProject(null);
        await loadProjects();
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingProject(null);
    };

    const deleteProject = async id => {
        try {
            await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });
            setProjects(prev => prev.filter(project => project._id !== id));
        } catch {
            console.error("Failed to delete project");
        }
    };

    return <div className="p-10">
        <h1 className="text-2xl mb-4">Your Projects</h1>

        {!isFormOpen && <button
            onClick={handleCreateNew}
            className="bg-blue-500 text-white px-4 py-2 mb-6 hover:bg-blue-600 rounded"
        >
            Create New Project
        </button>}

        {isFormOpen && <ProjectForm 
            project={editingProject}
            onSuccess={handleFormSuccess} 
            onCancel={handleCancel} 
        />}

        <ul className="space-y-3">
            {projects.map(project => <li
                key={project._id}
                className="flex justify-between border p-4 items-center rounded bg-white shadow-sm"
            >
                <Link 
                    href={`/projects/${project._id}`}
                    className="text-blue-600 hover:underline font-medium text-lg"
                >
                    {project.name}
                </Link>
                <div>
                    <button
                        onClick={() => handleEdit(project)}
                        className="text-amber-500 hover:text-amber-700 text-sm font-medium mr-4"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteProject(project._id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                        Delete
                    </button>
                </div>
            </li>)}
        </ul>
    </div>;
}