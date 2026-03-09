import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    image: String,
    role: { type: String, enum: ["ADMIN", "MEMBER"], default: "MEMBER" }
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    description: String,
    ownerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }
}, { timestamps: true });

const TaskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: String,
    status: { 
        type: String, 
        enum: ["TODO", "IN_PROGRESS", "DONE"], 
        default: "TODO" 
    },
    priority: { 
        type: String, 
        enum: ["LOW", "MEDIUM", "HIGH"], 
        default: "MEDIUM" 
    },
    dueDate: Date,
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project", 
        required: true 
    },
    assignedToId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);


// TODO: add sprints in the project details page
// TODO: when you click on a sprint, it opens up to show all the tasks within that sprint, progress and assigned member
// TODO: make dashboard usable