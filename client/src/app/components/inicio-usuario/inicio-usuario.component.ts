import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PresupuestosService } from '../../services/presupuestos.service';
import { Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
import { TweetService } from '../../services/tweet.service';
import { VideoService } from '../../services/video.service';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
export class InicioUsuarioComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPopup') videoPopup: ElementRef | undefined;
  presupuestos: any = [];
  idUsuario: string | null = null;
  tweets: any[] = [];  
  isTweetsPopupVisible: boolean = false;
  videos: any[] = [];
  selectedVideoUrl: string | null = null;
  isYoutubePopupVisible: boolean = false;
  videoUrl: string;

  private offsetX = 0;
  private offsetY = 0;
  private isDragging = false;
  
  initialPosition = { lat: 19.433668, lng: -99.115728 }; 
  center: google.maps.LatLngLiteral = this.initialPosition;
  zoom = 15;

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  markers: google.maps.Marker[] = [];

  constructor(
    private presupuestosService: PresupuestosService,
    private tweetService: TweetService,
    private renderer: Renderer2,
    private videoService: VideoService,
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
      this.getCurrentLocation(); 
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

  searchVideos(query: string) {
    this.videoService.searchVideos(query).subscribe(
      data => {
        this.videos = data.map((item: any) => ({
          title: item.snippet.title,
          videoId: item.id.videoId
        }));
      },
      error => console.error('Error al buscar videos', error)
    );
  }

  playVideo(videoId: string) {
    this.selectedVideoUrl = `https://www.youtube.com/embed/${videoId}`;
    this.videoService.setSelectedVideoUrl(this.videoUrl);
  }

  toggleYoutubePopup(): void {
    this.isYoutubePopupVisible = !this.isYoutubePopupVisible;
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.offsetX = event.clientX - this.videoPopup!.nativeElement.offsetLeft;
    this.offsetY = event.clientY - this.videoPopup!.nativeElement.offsetTop;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.renderer.setStyle(this.videoPopup!.nativeElement, 'left', `${event.clientX - this.offsetX}px`);
      this.renderer.setStyle(this.videoPopup!.nativeElement, 'top', `${event.clientY - this.offsetY}px`);
    }
  }

  onMouseUp() {
    this.isDragging = false;
  }
}
