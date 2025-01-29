"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailr = require("nodemailer");
exports.transporter = nodemailr.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: "luismanuelr245@gmail.com",
        pass: "koon kkua inwp avjc",
    },
    tls: {
        rejectUnauthorized: false,
    },
});
exports.transporter.verify().then(() => {
    console.log('Listo para envio de correos');
}).catch((err) => {
    console.error('Error al verificar el transporte:', err);
});
