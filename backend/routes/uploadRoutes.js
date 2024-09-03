import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// Resolve the full path to the uploads directory
const dirname = path.resolve();
console.log(dirname,"/backend/uploads")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(dirname, "uploads/")); // Use path.join to resolve the correct directory path
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/uploads/${req.file.filename}` , // Replace backslashes with forward slashes for URL consistency
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
