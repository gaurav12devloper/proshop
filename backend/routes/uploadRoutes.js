import path from  'path';
import express from 'express';
import multer from 'multer';  // npm i multer
const router=express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) { // destination function is property of multer function
        cb(null, 'uploads/'); // null indicating no error
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); // in this case, the file name will be the field name and the date and the extension
    }

});
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload=multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image uploaded',
        image: `/${req.file.path}`
    });
});

export default router;