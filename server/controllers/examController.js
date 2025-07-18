import Exam from "../models/Exam.js";
import User from "../models/User.js";

// Function to create exam
export const createExam = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { title, questions } = req.body;

    const newExam = new Exam({ title, questions, createdBy: userId });

    await newExam.save();

    return res.status(201).json({ success: true, exam: newExam });
  } catch (error) {
    console.error("Error Adding Exam:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get exam questions
export const getExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById(examId);

    exam.questions.forEach((question) => {
      question.correct = "";
    });

    return res.status(200).json({ success: true, exam });
  } catch (error) {
    console.error("Error Fetching Exam:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Function To answer exam
export const answerExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;
    const { userId } = req.auth();

    const exam = await Exam.findById(examId);

    let correct = [];
    let incorrect = [];

    exam.questions.forEach((question, index) => {
      if (answers[index] == question.correct) {
        correct.push(question);
      } else {
        incorrect.push(question);
      }
    });

    const user = await User.findById(userId);

    user.answeredExams.push({ examId, correct, incorrect });

    user.points += correct.length;

    await user.save();

    return res
      .status(200)
      .json({ success: true, correct, incorrect, points: correct.length });
  } catch (error) {
    console.error("Error Answering Exam:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ToDo: add This Functions

// Function To get all Exam Answers
export const allExamAnswers = async (req, res) => {};

// Function To get answer of user
export const userAnswer = async (req, res) => {};
