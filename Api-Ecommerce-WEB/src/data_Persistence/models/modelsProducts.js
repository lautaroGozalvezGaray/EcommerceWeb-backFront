import { Schema, model } from "mongoose";

const productsSchema = new Schema({
    id:{
        type: Number,
        required: [true, 'El id es obligatorio'],
    },
    title: {
        type: String,
        required: [true, 'El titele es obligatorio'],
    },
    price: {
        type: Number,
        required: [true, 'El price es obligatorio'],
    },
    thumbnail: {
        type: String,
    },
    categoria:{
        type: String,
    }
})

export default model("products", productsSchema);