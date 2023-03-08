import mongoose from "mongoose";
import Review from "./review.js";
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    imdbId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    releaseDate: { type: String, required: true },
    trailerLink: { type: String, required: true },
    genres: { type: Array, required: true },
    poster: { type: String, required: true },
    backdrop: { type: String },
    reviewIds: { type: Array },
    reviews: [{ type: Schema.Types.ObjectId, ref: Review }],
});

export default mongoose.model('Movie', movieSchema, 'movies');