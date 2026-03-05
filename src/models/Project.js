import mongoose from "mongoose";


const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: [true, "Project title is required"],
            trim: true,
        },
        description: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        status: {
            type: String,
            enum: ["active", "completed", "archived"],
            default: "active",
        },
    },
    { timestamps: true }
)

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);