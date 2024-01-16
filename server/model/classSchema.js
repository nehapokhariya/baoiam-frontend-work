// models/course.js
import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
});

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
});

const dppSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
});

// const quizSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   questions: [{ type: String, required: true }],
// });

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    lectures: [lectureSchema],
    notes: [noteSchema],
    dpp: dppSchema,
    //   quizzes: [quizSchema],
});

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    lessons: [lessonSchema],
});
export default mongoose.model('Chapter', chapterSchema);

