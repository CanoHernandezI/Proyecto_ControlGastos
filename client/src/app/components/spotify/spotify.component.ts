import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpotifyService } from '../../services/spotify.service';
import { PresupuestosService } from '../../services/presupuestos.service';
import { NotificationService } from '../../services/notification.service';
=======
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { AuthService } from '../../services/authspoti.service';

>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {
<<<<<<< HEAD
  notificationMessage: string | null = null;
  presupuestos: any = [];
  idUsuario: string | null = null;
  isAdmin: boolean;
  accessToken: string | null = null;
  selectedPodcastEmbedUrl: SafeResourceUrl | null = null;
  podcasts: any[] = [];
  selectedPodcastEpisodes: any[] = [];
=======
  accessToken: string | null = null;
  podcasts: any[] = [];
  selectedPodcastEpisodes: any[] = [];
  isLoadingEpisodes = false;
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
  isLoadingPodcasts = false;
  error: string | null = null;

  constructor(
<<<<<<< HEAD
    private presupuestosService: PresupuestosService,
    private spotifyService: SpotifyService,
    private sanitizer: DomSanitizer // Inyección de DomSanitizer
  ) {}

  ngOnInit(): void {
    this.spotifyService.getSpotifyToken().subscribe({
      next: (token) => {
        this.accessToken = token;
        if (this.accessToken) {
          this.searchFinancePodcasts();
          this.loadPresupuestos();
        }
      },
      error: (error) => {
        console.error('Error al obtener el token:', error);
=======
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private router: Router,
    private authService: AuthService  // Inyecta el AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        console.log('Codigo de aut',code);
        this.isLoadingPodcasts = true;
        this.spotifyService.getAccessToken(code).subscribe({
          next: (response) => {
            console.log('Respuesta al obtener el token:', response); // Verificar la respuesta al obtener el token
            this.accessToken = response.access_token;
            this.authService.setAccessToken(response.access_token);  // Guardamos el token en memoria
            //localStorage.setItem('spotify_refresh_token', response.refresh_token);
            this.searchPodcasts();  // Llamada para cargar los podcasts
          },
          error: (error) => {
            console.error('Error obteniendo token:', error);
            this.error = 'Error de autenticación con Spotify';
            this.isLoadingPodcasts = false;
          }
        });
      } else {
        // Intentar recuperar token del localStorage
        const savedToken = this.authService.getAccessToken();
        if (savedToken) {
          console.log('Token guardado:', savedToken); // Verificar si el token ya está guardado
          this.accessToken = savedToken;
          this.searchPodcasts();  // Si ya hay un token guardado, buscar podcasts
        }
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
      }
    });
  }

<<<<<<< HEAD
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

  searchFinancePodcasts(): void {
    this.isLoadingPodcasts = true;
    this.spotifyService.searchFinancePodcasts(this.accessToken as string).subscribe({
      next: (response) => {
        this.podcasts = response;
        this.isLoadingPodcasts = false;
      },
      error: (error) => {
        console.error('Error buscando podcasts:', error);
        this.error = 'Error al obtener podcasts';
        this.isLoadingPodcasts = false;
      }
    });
  }

// Método para seleccionar un podcast y crear el URL embebido
selectPodcast(podcastId: string): void {
  const url = `https://open.spotify.com/embed/show/${podcastId}`;
  this.selectedPodcastEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
}
=======
  authorizeSpotify(): void {
    const authUrl = this.spotifyService.authorizeSpotify();
    window.location.href = authUrl;
  }

  searchPodcasts(): void {
    if (this.accessToken) {
      this.isLoadingPodcasts = true;
      console.log('Acceso token en búsqueda de podcasts:', this.accessToken); // Verifica que el token esté presente

      this.spotifyService.searchFinancePodcasts(this.accessToken).subscribe({
        next: (response) => {
          this.podcasts = response;
          this.isLoadingPodcasts = false;
        },
        error: (error) => {
          console.error('Error buscando podcasts:', error);
          /*if (error.status === 401) {
            // Token expirado, intentar refresh
            const refreshToken = localStorage.getItem('spotify_refresh_token');
            if (refreshToken) {
              this.refreshToken(refreshToken);
            } else {
              this.authorizeSpotify(); // Redirigir si no hay token de refresh
            }
          } else {
            this.error = 'Error al obtener podcasts';
          }*/
          this.isLoadingPodcasts = false;
          this.error = 'Error al obtener podcasts';
        }
      });
    } else {
      this.error = 'No se pudo obtener un token de acceso';
    }
  }

/*
// Método para refrescar el token si ha expirado
private refreshToken(access_token: string): void {
  this.spotifyService.refreshToken(access_token).subscribe({
    next: (response) => {
      this.accessToken = response.access_token;
      localStorage.setItem('spotify_access_token', response.access_token);
      if (response.refresh_token) {
        localStorage.setItem('spotify_refresh_token', response.refresh_token);
      }
      this.searchPodcasts();
    },
    error: () => {
      this.authorizeSpotify();
    }
  });
}
*/
  
  loadPodcastEpisodes(podcastId: string): void {
    if (this.accessToken) {
      this.isLoadingEpisodes = true;
      this.spotifyService.getPodcastEpisodes(this.accessToken, podcastId).subscribe({
        next: (episodes) => {
          this.selectedPodcastEpisodes = episodes;
          this.isLoadingEpisodes = false;
        },
        error: (error) => {
          console.error('Error cargando episodios:', error);
          this.isLoadingEpisodes = false;
        }
      });
    }
  }

  trackByPodcastId(index: number, podcast: any): string {
  return podcast.id; // Usa el ID único de cada podcast para ayudar a Angular a hacer un seguimiento más eficiente
}

  
}
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
