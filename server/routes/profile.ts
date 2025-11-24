import { Router } from "express";
import type { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { authenticate } from "../auth/middleware.js";
import { unifiedDB } from "../db.js";
import { unifiedUsers } from "../../shared/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploads", "resumes");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const userId = (req as any).user.userId;
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `resume_${userId}_${timestamp}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

// ============================================================================
// CHECK RESUME
// ============================================================================
router.get(
  "/check-resume",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;

      const users = await unifiedDB
        .select()
        .from(unifiedUsers)
        .where(eq(unifiedUsers.id, userId))
        .limit(1);

      const user = users[0];

      res.json({
        success: true,
        hasResume: !!user?.resumePath,
        resumePath: user?.resumePath || null,
        resumeUploadedAt: user?.resumeUploadedAt || null,
      });
    } catch (error: any) {
      console.error("❌ Check resume error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to check resume",
      });
    }
  }
);

// ============================================================================
// UPLOAD RESUME
// ============================================================================
router.post(
  "/upload-resume",
  authenticate,
  upload.single("resume"),
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      // Store resume path in database
      const resumePath = `/uploads/resumes/${file.filename}`;

      await unifiedDB
        .update(unifiedUsers)
        .set({
          resumePath: resumePath,
          resumeUploadedAt: new Date(),
        })
        .where(eq(unifiedUsers.id, userId));

      res.json({
        success: true,
        message: "Resume uploaded successfully",
        data: {
          filename: file.filename,
          path: resumePath,
          size: file.size,
        },
      });
    } catch (error: any) {
      console.error("❌ Resume upload error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to upload resume",
      });
    }
  }
);

// ============================================================================
// UPDATE PROFILE
// ============================================================================
router.put("/update", authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { title, skills, experience, bio } = req.body;

    const updateData: any = {};
    if (title) updateData.professionalTitle = title;
    if (bio) updateData.bio = bio;
    if (experience) updateData.yearsOfExperience = experience;

    await unifiedDB
      .update(unifiedUsers)
      .set(updateData)
      .where(eq(unifiedUsers.id, userId));

    // TODO: Store skills in a separate table if needed

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updateData,
    });
  } catch (error: any) {
    console.error("❌ Profile update error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
});

export default router;
