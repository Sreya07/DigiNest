import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up simple storage for uploaded documents
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// @route   POST /api/documents/mask
// @desc    Simulate masking a document based on requested fields
// @access  Public (for demo purposes)
router.post('/mask', (req, res) => {
  try {
    const { documentId, requestedFields } = req.body;
    
    // Simulate processing delay
    setTimeout(() => {
      res.json({ 
        success: true, 
        message: 'Document successfully masked.',
        maskedDocumentUrl: `/uploads/masked_${documentId}_${Date.now()}.pdf`,
        maskedFieldsCount: 5,
        retainedFields: requestedFields
      });
    }, 1500);

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error during document masking' });
  }
});

// @route   POST /api/documents/upload-masked
// @desc    Upload a manually masked document
// @access  Public (for demo purposes)
router.post('/upload-masked', upload.single('document'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    res.json({
      success: true,
      message: 'Masked document uploaded successfully',
      fileUrl: `/uploads/${req.file.filename}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error during upload' });
  }
});

export default router;
