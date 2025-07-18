import Path from "../models/Path.js";
import { v2 as cloudinary } from "cloudinary";

// Function To Create New Path
export const addPath = async (req, res) => {
  try {
    const { name, description, courses } = req.body;
    const { userId } = req.auth();
    const imageFile = req.file;

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Thumbnail Not Attached" });
    }

    const newPath = new Path({ name, description, createdBy: userId, courses });

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newPath.thumbnail = imageUpload.secure_url;
    await newPath.save();

    return res.status(201).json({ success: true, path: newPath });
  } catch (error) {
    console.error("Error adding path:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get all paths
export const allPaths = async (req, res) => {
  try {
    const allPaths = await Path.find();
    return res.status(200).json({ success: true, paths: allPaths });
  } catch (error) {
    console.error("Error Fetching All Paths:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get path data
export const getPath = async (req, res) => {
  try {
    const { pathId } = req.params;
    const path = await Path.findById(pathId).populate("courses");

    // Remove lectureUrl if isPreviewFree is False
    path.courses.forEach((courseData) => {
      courseData.courseContent.forEach((chapter) => {
        chapter.chapterContent.forEach((lecture) => {
          if (!lecture.isFreePreview) {
            lecture.lectureUrl = "";
          }
        });
      });
    });

    return res.status(200).json({ success: true, path });
  } catch (error) {
    console.error("Error Fetching Path By Id:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
