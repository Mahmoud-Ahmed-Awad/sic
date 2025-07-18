import express from "express";
import {
  addUserRating,
  complateUserProfile,
  getUserCourseProgress,
  getUserData,
  purchaseCourse,
  updateUserCourseProgress,
  userEnrolledCourses,
} from "../controllers/userController.js";
import { checkComplatedProfile } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/complate-user-profile", complateUserProfile);

userRouter.get("/data", getUserData);

userRouter.use(checkComplatedProfile);

userRouter.get("/enrolled-courses", userEnrolledCourses);
userRouter.post("/purchase", purchaseCourse);

userRouter.patch("/update-course-progress", updateUserCourseProgress);
userRouter.get("/get-course-progress/{courseId}", getUserCourseProgress);
userRouter.post("/add-rating", addUserRating);

export default userRouter;
