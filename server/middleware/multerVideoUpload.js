import multer from 'multer';

// specify the storage engine

const storage = multer.memoryStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const storageVideo = multer.memoryStorage({
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// file validation

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb({ message: 'Unsupported File Format' }, false);
    }
};

const fileFilterVideo = (req, file, cb) => {
    if (file.mimetype === 'video/mp4' || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb({ message: 'Unsupported File Format' }, false);
    }
};

const uploadImage = multer({
    storage: storage,
    limits: { fileSize: 4096 * 4096 },
    fileFilter: fileFilter
});

const uploadVideo = multer({
    storage: storageVideo,
    fileFilter: fileFilterVideo
});

const storagepdf = multer.memoryStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// file validation

const fileFilterpdf = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb({ message: 'Unsupported File Format' }, false);
    }
};

const uploadAssignment = multer({
    storage: storagepdf,
    fileFilter: fileFilterpdf
});

export { uploadImage, uploadVideo, uploadAssignment };
