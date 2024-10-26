import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private apiUrl = 'http://localhost:3000/api/ubicacion'; 

  constructor(private http: HttpClient) {}

  // Iniciar una nueva ruta
  iniciarRuta(idUsuario: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/iniciar-ruta`, { idUsuario });
  }

  // Guardar ubicación en la ruta
  guardarUbicacion(idUsuario: number, idRuta: number, latitud: number, longitud: number, horaEntrada: string): Observable<any> {
    const body = { idUsuario, idRuta, latitud, longitud, horaEntrada };
    return this.http.post(`${this.apiUrl}/guardar`, body);
  }

  // Actualizar hora de salida de una ubicación
  actualizarHoraSalida(idUbicacion: number, horaSalida: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar-salida`, { idUbicacion, horaSalida });
  }

  // Finalizar la ruta
  finalizarRuta(idRuta: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/finalizar-ruta`, { idRuta });
  }

  // Obtener todas las rutas del usuario
  obtenerRutas(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/rutas/${idUsuario}`);
  }
}
