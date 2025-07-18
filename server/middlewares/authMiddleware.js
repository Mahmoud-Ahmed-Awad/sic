import { clerkClient } from "@clerk/express";
import User from "../models/User";

// Middleware (Protect Educator Routes)
export const protectEducator = async (req, res, next) => {
  try {
    const userId = req.auth().userId;
    const response = await clerkClient.users.getUser(userId);

    if (response.publicMetadata.role !== "educator") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    next();
  } catch (error) {
    console.error("Error in protectEducator middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Middleware To Check If Profile Complated
export const checkComplatedProfile = async (req, res, next) => {
  try {
    const userId = req.auth().userId;
    const user = await User.findById(userId);

    if (!user.age || !user.phoneNumber || !user.government || !user.school) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    next();
  } catch (error) {
    console.error("Error in checkComplatedProfile middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
