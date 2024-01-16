import Course from '../model/couresSchema.js';

// Course Controllers

// Get all courses controller
export const allCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.log("error");
    res.status(404).json({ msg: "Internal Server Error" });
  }
};

// Get a specific course by ID controller
export const courseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    console.log("error");
    res.status(404).json({ msg: "Internal Server Error" });
  }
};

// Create a new course controller
export const createCourse = async (req, res) => {
  const course = new Course(req.body);
  try {
    const newCourse = await course.save();
    res.status(200).json(newCourse);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Internal Server Error" });
  }
};

// Update a course by ID controller
export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Internal Server Error" });
  }
};

// Delete a course by ID controller
export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(404).json({ msg: "Internal Server Error" });
  }
};
