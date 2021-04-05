import mongoose from "mongoose";

const  Schema = mongoose.Schema;

export const LogSchema = new Schema({
    message: {
        type: String,
        required: 'Message text is required'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});