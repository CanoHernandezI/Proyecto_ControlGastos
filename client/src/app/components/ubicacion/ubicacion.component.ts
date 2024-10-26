import { Component, OnInit } from '@angular/core';
import { UbicacionService } from '../../services/ubicacion.service';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  map!: mapboxgl.Map; 
  idUsuario: string | null = null;
  idRuta!: number;
  rutasCompletas: any[] = [];
  latitudActual!: number;
  longitudActual!: number;
  horaEntrada!: string;

  constructor(private ubicacionService: UbicacionService) {}

  ngOnInit() {
    this.idUsuario = localStorage.getItem('IdUsuario');
    if (!this.idUsuario) {
      console.error('No se encontró el ID del usuario en localStorage');
      return;
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWNjYW5vaCIsImEiOiJjbTF1MW40djEwOG91MmlvbDVvM2pudDNkIn0.HwWvhLZXDgZCW4Sa3WDYmA'; // Reemplaza con tu token de MapBox

    this.map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-99.1332, 19.4326], 
      zoom: 12
    });

    this.map.on('load', () => {
      console.log('Mapa cargado correctamente');
      this.obtenerUbicacion();
      this.iniciarRuta();
      this.obtenerRutas();
    });
  }

  iniciarRuta() {
    this.ubicacionService.iniciarRuta(parseInt(this.idUsuario!))
      .subscribe((response) => {
        this.idRuta = response.idRuta;
        console.log('Ruta iniciada con ID:', this.idRuta);
      });
  }

  finalizarRuta() {
    this.ubicacionService.finalizarRuta(this.idRuta).subscribe({
      next: () => console.log('Ruta finalizada'),
      error: (err) => console.error('Error al finalizar la ruta', err)
    });
  }

  obtenerRutas() {
    this.ubicacionService.obtenerRutas(parseInt(this.idUsuario!))
      .subscribe((rutas) => {
        this.rutasCompletas = rutas;
        console.log('Rutas obtenidas:', this.rutasCompletas);
      });
  }

  obtenerUbicacion() {
    navigator.geolocation.watchPosition(
      (position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        this.latitudActual = latitud;
        this.longitudActual = longitud;
        this.horaEntrada = new Date().toISOString();

        if (this.map) {
          this.map.flyTo({ center: [longitud, latitud], zoom: 14 });

          new mapboxgl.Marker()
            .setLngLat([longitud, latitud])
            .addTo(this.map);

          // Guardar la ubicación en la base de datos
          if (this.idUsuario) {
            this.ubicacionService
              .guardarUbicacion(parseInt(this.idUsuario), this.idRuta, latitud, longitud, this.horaEntrada)
              .subscribe({
                next: () => console.log('Ubicación guardada'),
                error: (err) => console.error('Error guardando la ubicación', err)
              });
          }
        }
      },
      (error) => console.error('Error obteniendo la ubicación: ', error),
      { enableHighAccuracy: true }
    );
  }

  dibujarRuta(ruta: any) {
    if (ruta.ubicaciones.length > 0) {
      this.map?.flyTo({ center: [ruta.ubicaciones[0].Longitud, ruta.ubicaciones[0].Latitud], zoom: 12 });
      ruta.ubicaciones.forEach((ubicacion: any) => {
        new mapboxgl.Marker()
          .setLngLat([ubicacion.Longitud, ubicacion.Latitud])
          .addTo(this.map);
      });
    }
  }

  irALaUbicacionActual() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        if (this.map) {
          this.map.flyTo({ center: [longitud, latitud], zoom: 14 });
        }
      },
      (error) => console.error('Error obteniendo la ubicación: ', error)
    );
  }
}