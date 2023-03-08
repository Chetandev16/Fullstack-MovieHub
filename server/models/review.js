import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name : { type: String, required: true },
    imdbId : { type: String, required: true },
    body : { type: String, required: true },
})

export default mongoose.model('Review', reviewSchema, 'reviews');