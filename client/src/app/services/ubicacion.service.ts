import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private apiUrl = 'http://localhost:3000/api/ubicacion'; 

  constructor(private http: HttpClient) {}

  guardarUbicacion(idUsuario: number, latitud: number, longitud: number, horaEntrada: string): Observable<any> {
    const body = { idUsuario, latitud, longitud, horaEntrada };
    return this.http.post(`${this.apiUrl}/guardar`, body);
  }

  actualizarHoraSalida(idUsuario: number, latitud: number, longitud: number, horaSalida: string): Observable<any> {
    const body = { idUsuario, latitud, longitud, horaSalida };
    return this.http.put(`${this.apiUrl}/actualizar-salida`, body);
  }

  obtenerRutas(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/rutas/${idUsuario}`);
  }
}
