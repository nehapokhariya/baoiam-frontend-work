import express from "express";
import {
    createChapterName, createChapter
} from "../controller/classController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js"
// import { uploadVideo } from "../middleware/multerVideoUpload.js"
// import { uploadAssignment } from "../middleware/multerPdfUpload.js"
import { uploadMiddleware } from "../middleware/filemulter.js"

//router object
const router = express.Router();

//createChapter
router.post('/createchapterName', createChapterName);
router.post('/addlession/:chapterId',
  
    createChapter)

export default router;
