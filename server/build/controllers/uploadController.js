"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
const multer_1 = require("multer");
const path_1 = __importDefault(require("path"));
// Configurar almacenamiento de multer
const storage = multer_1.multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../../assets/images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.multer)({ storage: storage }).single('foto');
class UploadController {
    uploadImage(req, res) {
        upload(req, res, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ filePath: `/assets/images/${req.file.filename}` });
        });
    }
}
exports.uploadController = new UploadController();
