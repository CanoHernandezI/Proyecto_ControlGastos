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
            //Primero se obtiene el correo del usuario actual
            const req = { params: { id: userId } };
            const gmailRes = yield usuarioController_1.default.getGmail(userId);
            //Verifica si encontro correo
            if (!gmailRes) {
                console.error('Corro no encotrado');
                return;
            }
            const info = yield mailer_config_1.transporter.sendMail({
                from: '"Pruebas" <luismanuelr245@>', // sender address
                to: gmailRes, // list of receivers
                subject: "Hello word", // Subject line
                html: "<b>Hello world?</b>", // html body
            });
            console.log("Correo enviado: %s", info.messageId);
        }
        catch (error) {
            console.error("Error al enviar el correo:", error);
        }
    });
}
//Lama a la funcion con el ID de usuario valido
envioCorreo(1);
