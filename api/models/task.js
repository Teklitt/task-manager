import { Schema, model, models } from "mongodb";

const TaskSchema = new Schema({
    task: {
        type: String,
        required: [true, "Task is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
})

const toDoData = models.toDoData || model('toDoData', TaskSchema)

export default toDoData