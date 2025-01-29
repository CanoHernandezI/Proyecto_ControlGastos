"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailer_config_1 = require("../mailer_config");
const usuarioController_1 = __importDefault(require("./usuarioController"));
const correoController = {
    envioCorreo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body; // userId recibido desde el frontend
                // Validación del parámetro userId
                if (!userId || typeof userId !== "number") {
                    return res.status(400).json({ error: "El userId es inválido o no se proporcionó." });
                }
                // Obtener el correo electrónico del usuario
                const gmailRes = yield usuarioController_1.default.getGmail(userId);
                if (gmailRes == null) {
                    return res.status(404).json({ error: "Correo no encontrado para este usuario." });
                }
                // Enviar correo
                const info = yield mailer_config_1.transporter.sendMail({
                    from: '"Pruebas" <luismanuelr245@gmail.com>', // dirección del remitente
                    to: gmailRes, // destinatario
                    subject: "Hello World", // asunto
                    html: "<b>Hello world?</b>", // contenido HTML
                });
                console.log("Correo enviado: %s", info.messageId);
                return res.status(200).json({ message: "Correo enviado exitosamente", messageId: info.messageId });
            }
            catch (error) {
                console.error("Error al enviar el correo:", error);
                return res.status(500).json({ error: "Hubo un error al enviar el correo" });
            }
        });
    },
};
exports.default = correoController;
