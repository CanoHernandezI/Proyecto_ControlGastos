import { Component } from '@angular/core';
import { CorreoService } from '../../services/correo.service';

@Component({
  selector: 'app-correo-form',
  templateUrl: './correo-form.component.html',
  styleUrls: ['./correo-form.component.css'],
})
export class CorreoFormComponent {
  userId: number = 0; // ID del usuario ingresado en el formulario
  mensaje: string = ''; // Mensaje de éxito o error

  constructor(private correoService: CorreoService) {}

  enviarCorreo() {
    if (this.userId <= 0) {
      this.mensaje = 'Por favor ingrese un ID de usuario válido.';
      return;
    }

    this.correoService.enviarCorreo(this.userId).subscribe(
      (response) => {
        this.mensaje = `Correo enviado exitosamente: ${response.messageId}`;
      },
      (error) => {
        console.error(error);
        this.mensaje = 'Hubo un error al enviar el correo.';
      }
    );
  }
}
