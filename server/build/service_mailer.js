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
const mailer_config_1 = require("./mailer_config");
const usuarioController_1 = __importDefault(require("./controllers/usuarioController"));
function envioCorreo(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Obtiene el correo del usuario actual
            const gmailRes = yield usuarioController_1.default.getGmail(userId);
            // Verifica si encontró el correo
            if (!gmailRes) {
                console.error("Correo no encontrado");
                return;
            }
            const info = yield mailer_config_1.transporter.sendMail({
<<<<<<< HEAD
                from: '"Pruebas" <luismanuelr245@gmail.com>', // sender address
                to: gmailRes, // list of receivers
                subject: "Hello word", // Subject line
                html: "<b>Hello world?</b>", // html body
=======
                from: '"Pruebas" <luismanuelr245@example.com>', // Asegúrate de usar un correo válido
                to: gmailRes, // Lista de destinatarios
                subject: "Hello World", // Asunto del correo
                html: "<b>Hello world?</b>", // Cuerpo en HTML
>>>>>>> 8491f37a2b39f49e05c7505cfab8a1ab59649615
            });
            console.log("Correo enviado: %s", info.messageId);
        }
        catch (error) {
            console.error("Error al enviar el correo:", error);
        }
    });
}
// Llama a la función con un ID de usuario válido
envioCorreo(1);
