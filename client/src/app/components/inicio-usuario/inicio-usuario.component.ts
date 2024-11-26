import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PresupuestosService } from '../../services/presupuestos.service';
import { Router } from '@angular/router';
<<<<<<< HEAD
import * as mapboxgl from 'mapbox-gl';
import { UsuarioService } from '../../services/usuario.service';
=======
import { GoogleMap } from '@angular/google-maps';
import { TweetService } from '../../services/tweet.service';
import { VideoService } from '../../services/video.service';
import { ElementRef, Renderer2 } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { HttpClient } from '@angular/common/http';
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
<<<<<<< HEAD
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
=======
export class InicioUsuarioComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPopup') videoPopup: ElementRef | undefined;
  @ViewChild('messageInput') messageInput!: ElementRef;
  query: string = '';
  results: any[] = [];
  searchPerformed: boolean = false;
  chatMessages: { type: string; text: string }[] = [];
  presupuestos: any = [];
  idUsuario: string | null = null;
  tweets: any[] = [];
  isTweetsPopupVisible: boolean = false;
  videos: any[] = [];
  selectedVideoUrl: string | null = null;
  isYoutubePopupVisible: boolean = false;
  isTelegramPopupVisible: boolean = false;
  isGooglePopupVisible: boolean = false;
  videoUrl: string;
  chatId: string = '6661979365';

  suggestions: string[] = [
    "Cómo hacer un presupuesto",
    "Consejos para ahorrar dinero",
    "Inversiones para principiantes",
    "Errores comunes en el control de gastos",
    "Cómo mejorar la salud financiera",
    "Consejos de finanzas personales"
  ];
  
  filteredSuggestions: string[] = [];
  

  private apiKey: string = 'AIzaSyCkCmBeyvOnhnsPpaIv31_h9T4blk0Sy8A';
  private searchEngineId: string = '72c53c886ef4f4338';

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
    private http: HttpClient,
    private telegramService: TelegramService,
    private renderer: Renderer2,
    private videoService: VideoService,
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
    private router: Router,
    private usuarioService: UsuarioService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

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

<<<<<<< HEAD
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
=======
  clearMarkers() {
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
  }

  recenterMap() {
    if (this.map?.googleMap) {
      this.getCurrentLocation();
      this.map.googleMap.setZoom(14);
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
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

<<<<<<< HEAD
=======
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

  toggleTelegramPopup(): void {
    this.isTelegramPopupVisible = !this.isTelegramPopupVisible;
  }

  sendMessage(): void {
    const message = this.messageInput.nativeElement.value;
    if (message.trim()) {
        this.chatMessages.push({ type: 'outgoing', text: message });

        this.telegramService.sendMessage(this.chatId, message).subscribe(
            (response) => {
                if (response && response.message) {
                    this.chatMessages.push({ type: 'incoming', text: response.message });

                    if (response.redirect) {
                        if (/creación de gastos/i.test(response.message)) {
                            this.router.navigate(['gastos/add']);
                        } else if (/listado de gastos/i.test(response.message)) {
                            this.router.navigate(['gastos/list']);
                        } else if (/creación de ingresos/i.test(response.message)) {
                            this.router.navigate(['ingresos/add']);
                        } else if (/listado de ingresos/i.test(response.message)) {
                            this.router.navigate(['ingresos/list']);
                        } else if (/creación de servicios/i.test(response.message)) {
                            this.router.navigate(['servicios/add']);
                        } else if (/listado de servicios/i.test(response.message)) {
                            this.router.navigate(['servicios/list']);
                        } else if (/resumen/i.test(response.message)) {
                            this.router.navigate(['resumen']);
                        }
                    }
                } else {
                    console.error('Respuesta del servidor no contiene un mensaje');
                }
            },
            (error) => {
                console.error('Error enviando mensaje al bot de Telegram', error);
            }
        );

        this.messageInput.nativeElement.value = '';
    }
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
}



  performSearch() {
    if (this.query.trim() === '') return;

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(this.query)}&key=${this.apiKey}&cx=${this.searchEngineId}`;

    this.http.get<any>(url).subscribe(
      (data) => {
        this.results = data.items || [];
        this.searchPerformed = true;
        this.filteredSuggestions = [];
      },
      (error) => {
        console.error('Error:', error);
        this.results = [];
        this.searchPerformed = true;
      }
    );
  }

  toggleGooglePopup(): void {
    this.isGooglePopupVisible = !this.isGooglePopupVisible;
    if (this.isGooglePopupVisible) {
      const randomIndex = Math.floor(Math.random() * this.suggestions.length);
      this.query = this.suggestions[randomIndex];
    }
  }
  

  onInputChange(query: string) {
    this.filteredSuggestions = this.suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  }
}


