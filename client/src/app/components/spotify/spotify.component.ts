import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { AuthService } from '../../services/authspoti.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {
  accessToken: string | null = null;
  podcasts: any[] = [];
  selectedPodcastEpisodes: any[] = [];
  isLoadingEpisodes = false;
  isLoadingPodcasts = false;
  error: string | null = null;

  constructor(
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
      }
    });
  }

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