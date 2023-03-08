import JwtService from "../services/JwtService";
import { Movie } from "../models";
import { Review } from "../models";

const MyController = {
    getAllMovies: async (req, res, next) => {
        let movies;
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = JwtService.verifyToken(token);
            if (!decoded) return res.status(401).json({ message: "unauthorized" })

            movies = await Movie.find();

        } catch (err) {
            return res.status(401).json({ message: "unauthorized" });
        }
        res.json(movies)
    },
    getSingleMovie: async (req, res, next) => {
        const imdbId = req.params.id;
        let movie;

        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = JwtService.verifyToken(token);
            if (!decoded) return res.status(401).json({ message: "unauthorized" })

            movie = await Movie.findOne({ imdbId: imdbId });
            if (!movie) return res.status(404).json({ message: "not found" });
        } catch (err) {
            return res.status(401).json({ message: "unauthorized" });
        }

        res.json(movie);
    },
    postReview: async (req, res, next) => {
        let movie;

        try {
            const imdbId = req.body.imdbId;
            const token = req.headers.authorization.split(" ")[1];
            const decoded = JwtService.verifyToken(token);
            if (!decoded) return res.status(401).json({ message: "unauthorized" })

            movie = await Movie.findOne({ imdbId: imdbId });
            if (!movie) return res.status(404).json({ message: "not found" });

            const review = new Review({
                name: req.body.name,
                imdbId: req.body.imdbId,
                body: req.body.body,
            })

            const t = await review.save();
            console.log(t);
            movie.reviewIds.push(review._id);
            await movie.save();

        } catch (err) {
            console.log(err);
            return res.status(401).json({ message: "unauthorized" });
        }
        res.json({ message: "Review Posted!!" });
    },
    getReviews : async (req, res, next) => {
        let reviews;
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = JwtService.verifyToken(token);
            if (!decoded) return res.status(401).json({ message: "unauthorized" })

            const imdbId = req.params.id;
            reviews = await Review.find({imdbId: imdbId})
            // console.log(reviews);
        } catch (err) {
            return res.status(401).json({ message: "unauthorized" });
        }
        res.json(reviews)
    }
}

export default MyController;