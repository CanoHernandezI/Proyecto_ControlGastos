
import { transporter } from "./mailer_config";
import usuarioController from "./controllers/usuarioController";
import { convertToObject } from "typescript";


async function envioCorreo(userId:number) {
    try{
        //Primero se obtiene el correo del usuario actual
        const req: any = { params: { id: userId }};

        const gmailRes = await usuarioController.getGmail(userId);

        //Verifica si encontro correo
        if(!gmailRes){
            console.error('Corro no encotrado');
            return;
        }
        
        const info = await transporter.sendMail({
            from: '"Pruebas" <luismanuelr245@>', // sender address
            to: gmailRes, // list of receivers
            subject: "Hello word", // Subject line
            html: "<b>Hello world?</b>", // html body
          });
           
          console.log("Correo enviado: %s", info.messageId);
    }catch(error){
        console.error("Error al enviar el correo:", error);
    }
}
//Lama a la funcion con el ID de usuario valido
envioCorreo(1);
