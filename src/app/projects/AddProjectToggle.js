"use client";

import { useState } from "react";
import ProjectForm from "./ProjectForm";

export default function AddProjectToggle() {
    const [showForm, setShowForm] = useState(false);

    if (showForm) {
        return (
            <div className="mb-8">
                <ProjectForm onSuccess={() => setShowForm(false)} />
            </div>
        );
    }

    return (
        <button 
            onClick={() => setShowForm(true)}
            className="mb-8 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-bold shadow-sm flex items-center gap-2"
        >
            Add New Project
        </button>
    );
}