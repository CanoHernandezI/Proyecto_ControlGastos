import nodemailer from "nodemailer"; // Corrección de importación

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true para el puerto 465, false para otros
  auth: {
    user: "luismanuelr245@gmail.com",
    pass: "koon kkua inwp avjc", // Usa variables de entorno para mayor seguridad
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verifica el transporte
transporter
  .verify()
  .then(() => {
    console.log("Listo para envío de correos");
  })
  .catch((err: Error) => {
    // Corrección de tipo
    console.error("Error al verificar el transporte:", err);
  });
