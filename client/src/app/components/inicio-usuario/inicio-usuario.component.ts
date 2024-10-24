import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PresupuestosService } from '../../services/presupuestos.service';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
export class InicioUsuarioComponent implements OnInit {
  presupuestos: any = [];
  idUsuario: string | null = null;
  isAdmin: boolean;  // Por defecto es usuario normal hasta que se demuestre lo contrario
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  userCoordinates: [number, number][] = []; // Array para almacenar las coordenadas de la ruta
  route!: mapboxgl.Source; // Fuente de datos para la ruta

  constructor(
    private presupuestosService: PresupuestosService,
    private router: Router,
    private usuarioService: UsuarioService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.idUsuario = localStorage.getItem('IdUsuario');
      if (this.idUsuario) {
        this.loadPresupuestos();
        this.initializeMap();
      }
    } else {
      console.warn('No se puede acceder a localStorage en el lado del servidor.');
      this.router.navigate(['/login']);
    }
  }

  
 

  loadPresupuestos() {
    if (this.idUsuario) {
      this.presupuestosService.getPresupuestos(this.idUsuario).subscribe(
        (resp: any) => {
          this.presupuestos = resp;
        },
        err => console.log(err)
      );
    }
  }

  // Inicializar el mapa con el accessToken incluido en las opciones
  initializeMap(): void {
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiaXNhYWNjYW5vaCIsImEiOiJjbTF1MW40djEwOG91MmlvbDVvM2pudDNkIn0.HwWvhLZXDgZCW4Sa3WDYmA', // Incluye tu API Key de Mapbox aquí
      container: 'map', // El id del div en el HTML donde se cargará el mapa
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-74.5, 40], // Coordenadas iniciales (longitud, latitud)
      zoom: 9 // Nivel de zoom inicial
    });

    // Añadir la fuente para la ruta
    this.map.on('load', () => {
      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: this.userCoordinates
          }
        }
      });

      // Añadir una capa visual para la ruta
      this.map.addLayer({
        id: 'route-layer',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#ff0000', // Color de la línea
          'line-width': 4 // Grosor de la línea
        }
      });

      this.trackUserLocation(); // Iniciar el seguimiento de la ubicación
    });
  }

  trackUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const lng = position.coords.longitude;
          const lat = position.coords.latitude;
      
          this.userCoordinates.push([lng, lat]);
          
          (this.map.getSource('route') as mapboxgl.GeoJSONSource).setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: this.userCoordinates
            }
          });
      
          this.map.flyTo({
            center: [lng, lat],
            essential: true,
            zoom: 15
          });
      
          if (!this.marker) {
            this.marker = new mapboxgl.Marker()
              .setLngLat([lng, lat])
              .addTo(this.map);
          } else {
            this.marker.setLngLat([lng, lat]);
          }
        },
        (error) => {
          if (error.code === 3) {
            console.error('Tiempo de espera excedido para obtener la ubicación.');
          } else {
            console.error('Error al obtener la ubicación:', error);
          }
        },
        {
          enableHighAccuracy: false, // Menor precisión
          timeout: 30000, // Tiempo máximo de espera aumentado a 30 segundos
          maximumAge: 0
        }
      );      
    } else {
      alert('Geolocalización no soportada por tu navegador.');
    }
  }

  // Función para obtener la ubicación del usuario
  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        // Centramos el mapa en la ubicación del usuario
        this.map.flyTo({
          center: [lng, lat],
          essential: true,
          zoom: 15
        });

        // Si ya hay un marcador, lo quitamos
        if (this.marker) {
          this.marker.remove();
        }

        // Colocamos un nuevo marcador en la ubicación del usuario
        this.marker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(this.map);
      }, () => {
        alert('No se pudo obtener tu ubicación');
      });
    } else {
      alert('Geolocalización no soportada por el navegador');
    }
  }

}
