"use client";

import { useEffect, useState } from "react";

export default function ProjectPage({ params }) {
    const { id } = params;
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
        try {
            const res = await fetch(`/api/projects/${id}`);
            const data = await res.json();
            setProject(data);
        } catch {
            console.error("Failed to fetch project data");
        }
        };

        fetchProject();
    }, [id]);

    if (!project) return <div>Loading...</div>;

    return (
        <div className="p-10">
        <h1 className="text-3xl">{project.name}</h1>
        <p className="mt-4">{project.description}</p>
        </div>
    );
}