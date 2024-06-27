import { Schema, model } from "mongoose";
const userSchema = new Schema({
    password: {
        type: Object,
        required: [true, 'El password es obligatorio'],
    },
    name:{
        type: String,
        required: [true, 'El password es obligatorio'],
    },
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
    },
})

export default model("users", userSchema);