import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CorreoService {
  private apiUrl = 'http://localhost:3000/api/correos'; // URL del backend

  constructor(private http: HttpClient) {}

  // Método para enviar el correo
  enviarCorreo(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviar-correo`, { userId });
  }
}
