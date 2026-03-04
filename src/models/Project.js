import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
    },
    { timestamps: true }
)

export default mongoose.model("Project", ProjectSchema)