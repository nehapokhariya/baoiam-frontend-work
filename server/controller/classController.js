import Chapter from '../model/classSchema.js' // Adjust the path based on your file structure
import { postObject } from "../helper/s3/s3lectureUpload.js"
// Controller to get all chapters
const getAllChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find();
        res.json(chapters);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to get a single chapter by ID
const getChapterById = async (req, res) => {
    const { chapterId } = req.params;

    try {
        const chapter = await Chapter.findById(chapterId);

        if (!chapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }

        res.json(chapter);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// create chapter
export const createChapterName = async (req, resp) => {
    const { title, description } = req.body;
    try {
        const newChapter = await Chapter({ title, description }).save();
        if (newChapter) {
            resp.status(200).send({
                success: true,
                message: "New Chapter is created successfully!",
            })
        } else {
            resp.status(400).send("Failed to add new chapter.")
        }
    } catch (error) {
        console.log(first)
        resp.status(500).send({
            success: false,
            message: error
        })
    }

}


// Controller to create a new chapter


export const createChapter = async (req, res) => {
    const chapterId = req.params.chapterId;
    console.log(chapterId)

    const { title, description, notes, dpp, lectures } = req.body;
    // const lectures = req.file;
    // console.log(lectures)
    // const videoname = req.file.originalname;
    // console.log(videoname)
    try {
        // const get = await postObject(videoname, lectures);
        // console.log("the video url is", get);
        const lecture = {
            title,
            content: lectures
        }
        const dppp = {
            title,
            content: dpp
        }
        const note = {
            title,
            content: notes
        }
        const lesson = {
            title,
            description,
            lectures: lecture,
            notes: note,
            dpp: dppp
        };

        const updatedChapter = await Chapter.findByIdAndUpdate(
            chapterId,
            { $push: { lessons: lesson } },
            { new: true }
        );

        res.json(updatedChapter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to update a chapter by ID
const updateChapterById = async (req, res) => {
    const { chapterId } = req.params;
    const { title, description, lessons } = req.body;

    try {
        const updatedChapter = await Chapter.findByIdAndUpdate(
            chapterId,
            { title, description, lessons },
            { new: true }
        );

        if (!updatedChapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }

        res.json(updatedChapter);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to delete a chapter by ID
const deleteChapterById = async (req, res) => {
    const { chapterId } = req.params;

    try {
        const deletedChapter = await Chapter.findByIdAndDelete(chapterId);

        if (!deletedChapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }

        res.json(deletedChapter);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// module.exports = {
//     getAllChapters,
//     getChapterById,
//     createChapter,
//     updateChapterById,
//     deleteChapterById,
// };
