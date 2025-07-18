import express from "express";
import { protectEducator } from "../middlewares/authMiddleware";
import { answerExam, createExam, getExam } from "../controllers/examController";

const examRouter = express.Router();

examRouter.post("/create", protectEducator, createExam);
examRouter.get("/:examId", getExam);
examRouter.post("/answer", answerExam);

export default examRouter;
