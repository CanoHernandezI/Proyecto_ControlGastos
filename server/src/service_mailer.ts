import { transporter } from "./mailer_config";
import usuarioController from "./controllers/usuarioController";

async function envioCorreo(userId: number) {
    try {
        // Obtiene el correo del usuario actual
        const gmailRes = await usuarioController.getGmail(userId);

        // Verifica si encontró el correo
        if (!gmailRes) {
            console.error("Correo no encontrado");
            return;
        }

        const info = await transporter.sendMail({
            from: '"Pruebas" <luismanuelr245@gmail.com>', // sender address
            to: gmailRes, // list of receivers
            subject: "Hello word", // Subject line
            html: "<b>Hello world?</b>", // html body
          });
           
          console.log("Correo enviado: %s", info.messageId);
    }catch(error){
        console.error("Error al enviar el correo:", error);
    }
}

// Llama a la función con un ID de usuario válido
envioCorreo(1);
