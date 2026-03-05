import mongoose from 'mongoose';

const SprintSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true,
    },
    goal: {
        type: String,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['planned', 'in-progress', 'completed'],
        default: 'planned',
    },
    },
    { timestamps: true }
);

const Sprint = mongoose.models.Sprint || mongoose.model('Sprint', SprintSchema
);