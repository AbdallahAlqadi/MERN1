const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// إعداد Multer لحفظ الملفات في مجلد 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

app.use(express.static('uploads')); // للسماح بعرض الملفات من مجلد 'uploads'

// نقطة نهاية لرفع الملفات
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;

    // إعادة الرابط إلى Frontend
    res.json({ fileUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
