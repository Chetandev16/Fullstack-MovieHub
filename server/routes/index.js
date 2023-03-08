import express from "express";
import { loginController, registerController } from "../controller";
import movieController from "../controller/movieController";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/getUsername/:email", loginController.getUsername);
router.get("/movies/allmovies", movieController.getAllMovies);
router.get("/movies/imdb/:id", movieController.getSingleMovie);
router.post("/movies/reviews", movieController.postReview);
router.get("/movies/reviews/:id", movieController.getReviews);


export default router;