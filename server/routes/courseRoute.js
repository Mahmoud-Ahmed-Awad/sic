import express from "express";
import {
  coursesWithLearnerType,
  getAllCourses,
  getCourseId,
} from "../controllers/CourseController.js";

const courseRouter = express.Router();

courseRouter.get("/all", getAllCourses);
courseRouter.get("/id/:id", getCourseId);
courseRouter.get("/learner-type/:learnerType", coursesWithLearnerType);

export default courseRouter;
