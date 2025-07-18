import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      // default: () => new mongoose.Types.ObjectId().toString(),
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
      min: 5,
      max: 30,
    },
    government: {
      type: String,
      enum: [
        "Cairo",
        "Giza",
        "Alexandria",
        "Dakahlia",
        "Red Sea",
        "Beheira",
        "Fayoum",
        "Gharbia",
        "Ismailia",
        "Menofia",
        "Minya",
        "Qaliubiya",
        "New Valley",
        "Suez",
        "Aswan",
        "Assiut",
        "Beni Suef",
        "Port Said",
        "Damietta",
        "Sharkia",
        "South Sinai",
        "Kafr El Sheikh",
        "Matrouh",
        "Luxor",
        "Qena",
        "North Sinai",
        "Sohag",
      ],
      required: false,
    },
    school: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    learningType: {
      type: String,
      enum: ["visual", "audio", "kinetic"],
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: { type: String, required: true },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
