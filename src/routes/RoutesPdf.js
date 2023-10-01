const upload= require("./upload");
const fileUploading = require("../controller/uploadControl");
const express = require("express");
const pdfRouter = express.Router();

pdfRouter.post("/upload", upload.single("file"), fileUploading.fileUpload);
pdfRouter.get("/file/:filename", fileUploading.getFile);
pdfRouter.get("/file/download/:filename", fileUploading.showFile);
pdfRouter.post("/delete/file/:filename", fileUploading.deleteFile);
pdfRouter.post("/textPdfToWord", upload.single("file"), fileUploading.pdf2Word);
pdfRouter.post("/ocr", upload.single("file"), fileUploading.ocr);

module.exports = router;