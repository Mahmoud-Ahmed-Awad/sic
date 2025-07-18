import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  order: { type: Number, required: true },
});

const pathSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  learnerType: {
    type: String,
    enum: ["visual", "audio", "kinetic"],
    required: true,
  },
  courses: [courseSchema],
  createdBy: {
    type: String,
    ref: "User",
    required: true,
  },
});

const Path = mongoose.model("path", pathSchema);

export default Path;
