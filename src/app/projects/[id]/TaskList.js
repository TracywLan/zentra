"use client";
import { useRouter } from "next/navigation";

export default function TaskList({ initialTasks }) {
    const router = useRouter();

    const toggleStatus = async task => {
        const newStatus = task.status === "DONE" ? "TODO" : "DONE";
        
        await fetch(`/api/tasks/${task._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
        
        router.refresh();
    };

    const deleteTask = async taskId => {
        const confirmed = window.confirm("Delete this task?");
        if (!confirmed) return;

        await fetch(`/api/tasks/${taskId}`, {
            method: "DELETE"
        });
        
        router.refresh();
    };

    const formatDate = dateString => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    if (initialTasks.length === 0) {
        return <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-12 text-center">
            <p className="text-gray-500 font-medium">
                No tasks added yet.
            </p>
        </div>;
    }

    const totalTasks = initialTasks.length;
    const completedTasks = initialTasks.filter(task => task.status === "DONE").length;
    const progressPercentage = Math.round(completedTasks / totalTasks * 100) || 0;

    return <div>
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-gray-700">Project Progress</span>
                <span className="text-sm font-bold text-gray-900">
                    {completedTasks} of {totalTasks} completed {progressPercentage}%
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                    className="bg-gray-900 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>

        <div className="space-y-4">
            {initialTasks.map(task => <div key={task._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200 group">
                <div className="flex items-center gap-4">
                    <input 
                        type="checkbox" 
                        checked={task.status === "DONE"} 
                        onChange={() => toggleStatus(task)}
                        className="h-5 w-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer" 
                    />
                    <div className="flex flex-col">
                        <span className={`text-lg font-medium ${task.status === "DONE" ? "line-through text-gray-400" : "text-gray-900"}`}>
                            {task.title}
                        </span>
                        {task.dueDate && <span className="text-xs text-gray-500 mt-1 font-medium">
                            Due: {formatDate(task.dueDate)}
                        </span>}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                        task.priority === "HIGH" ? "bg-red-100 text-red-700" : 
                        task.priority === "MEDIUM" ? "bg-amber-100 text-amber-700" : 
                        "bg-green-100 text-green-700"
                    }`}>
                        {task.priority}
                    </span>
                    <span className="text-xs font-bold uppercase px-2 py-1 bg-gray-100 rounded text-gray-600">
                        {task.status.replace("_", " ")}
                    </span>
                    <button 
                        onClick={() => deleteTask(task._id)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2 font-bold"
                    >
                        Delete
                    </button>
                </div>
            </div>)}
        </div>
    </div>;
}