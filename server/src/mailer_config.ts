import nodemailr = require('nodemailer');

export const transporter = nodemailr.createTransport({
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

  transporter.verify().then(() => {
    console.log('Listo para envio de correos')
  }).catch((err) =>{
    console.error('Error al verificar el transporte:', err);
  });