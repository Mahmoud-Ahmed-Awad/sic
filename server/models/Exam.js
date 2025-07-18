import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  correct: [Number],
  incorrect: [Number],
});

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  choices: [String],
  correct: {
    type: Number,
    required: true,
  },
  answers: [answerSchema],
});

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  createdBy: {
    type: String,
    ref: "User",
  },
});

const Exam = mongoose.model("exam", examSchema);

export default Exam;
