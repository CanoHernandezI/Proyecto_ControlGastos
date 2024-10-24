import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PresupuestosService } from '../../services/presupuestos.service';
import { Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
import { TweetService } from '../../services/tweet.service';  

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
export class InicioUsuarioComponent implements OnInit, AfterViewInit {
  presupuestos: any = [];
  idUsuario: string | null = null;
  tweets: any[] = [];  // Variable para almacenar los tweets
  isTweetsPopupVisible: boolean = false;

  initialPosition = { lat: 19.433668, lng: -99.115728 }; 
  center: google.maps.LatLngLiteral = this.initialPosition;
  zoom = 15;

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  markers: google.maps.Marker[] = [];

  constructor(
    private presupuestosService: PresupuestosService,
    private tweetService: TweetService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.idUsuario = localStorage.getItem('IdUsuario');
      if (this.idUsuario) {
        this.loadPresupuestos();
        this.loadTweets();
      } else {
        console.error('Usuario no autenticado');
        this.router.navigate(['/login']);
      }
    } else {
      console.warn('No se puede acceder a localStorage en el lado del servidor.');
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('load', () => {
        this.getCurrentLocation();
      });
    }
  }

  loadPresupuestos() {
    if (this.idUsuario) {
      this.presupuestosService.getPresupuestos(this.idUsuario).subscribe(
        (resp: any) => {
          this.presupuestos = resp;
        },
        (err) => console.log(err)
      );
    }
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.initializeMap();
        },
        (error) => {
          console.error('Error obteniendo la ubicación: ', error);
        }
      );
    } else {
      console.warn('Geolocalización no es soportada por este navegador.');
    }
  }

  initializeMap() {
    if (this.map?.googleMap) {
      this.addMarker(this.center);
    } else {
      console.error('Mapa no está inicializado.');
    }
  }

  addMarker(location: google.maps.LatLngLiteral) {
    this.clearMarkers();

    const marker = new google.maps.Marker({
      position: location,
      map: this.map.googleMap!,
      title: 'Estoy aquí'
    });

    this.markers.push(marker);
  }

  clearMarkers() {
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
  }

  recenterMap() {
    if (this.map?.googleMap) {
      this.getCurrentLocation(); // Redirigir al usuario a su ubicación actual
      this.map.googleMap.setZoom(14);
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      console.log(event.latLng.toJSON());
    }
  }

  loadTweets() {
    this.tweetService.getTweets().subscribe(
      data => {
        this.tweets = data;
      },
      error => {
        console.error('Error al obtener tweets', error);
      }
    );
  }
  
  toggleTweetsPopup(): void {
    this.isTweetsPopupVisible = !this.isTweetsPopupVisible;
  }
}
