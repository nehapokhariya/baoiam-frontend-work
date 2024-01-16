import express from "express";
import { createCourse } from "../controller/courseController.js";

//-------------- ROUTING OBJECT -----------
const router = express.Router();

//-------------- ROUTING -----------

// Get all courses
// router.route("/courses").get(courseControllers.allCourses);

// Get a specific course by ID
// router.route("/courses/:id").get(courseControllers.courseById);

// Create a new course

router.route("/createcourse").post(createCourse);

// Update a course by ID
// router.route("/courses/:id").put(courseControllers.updateCourse);

// Delete a course by ID
// router.route("/courses/:id").delete(courseControllers.deleteCourse);

export default router;
