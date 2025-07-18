import express from "express";
import { addPath, allPaths, getPath } from "../controllers/pathController.js";
import { protectEducator } from "../middlewares/authMiddleware.js";

const pathRouter = express.Router();

pathRouter.post("/add", protectEducator, addPath);
pathRouter.get("/all", allPaths);
pathRouter.get("/:pathId", getPath);

export default pathRouter;
