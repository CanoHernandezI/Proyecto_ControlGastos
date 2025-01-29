import { Request, Response } from "express";
import { transporter } from "../mailer_config";
import usuarioController from "./usuarioController";

const correoController = {
  async envioCorreo(req: Request, res: Response) {
    try {
      const { userId } = req.body; // userId recibido desde el frontend

       // Validación del parámetro userId
       if (!userId || typeof userId !== "number") {
        return res.status(400).json({ error: "El userId es inválido o no se proporcionó." });
      }
      
      // Obtener el correo electrónico del usuario
      const gmailRes = await usuarioController.getGmail(userId);

      if (gmailRes == null) {
        return res.status(404).json({ error: "Correo no encontrado para este usuario." });
      }

      // Enviar correo
      const info = await transporter.sendMail({
        from: '"Pruebas" <luismanuelr245@gmail.com>', // dirección del remitente
        to: gmailRes, // destinatario
        subject: "Hello World", // asunto
        html: "<b>Hello world?</b>", // contenido HTML
      });

      console.log("Correo enviado: %s", info.messageId);
      return res.status(200).json({ message: "Correo enviado exitosamente", messageId: info.messageId });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      return res.status(500).json({ error: "Hubo un error al enviar el correo" });
    }
  },
};

export default correoController;
