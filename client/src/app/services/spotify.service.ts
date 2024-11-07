import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from './authspoti.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  public clientId = 'd8a3a9f7b3904faba2471f5cacde92da';
  private clientSecret = '9890793f745946d9831228ff5a15b81e';
  public redirectUri = 'http://localhost:4200/spotify';
  private authTokenUrl = 'https://accounts.spotify.com/api/token';
  private apiUrl = 'https://api.spotify.com/v1';

  private accessToken: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAccessToken(code: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('redirect_uri', this.redirectUri);
  
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    const authHeader = 'Basic ' + btoa(`${clientId}:${clientSecret}`);
  
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', authHeader);
  
    // Log para verificar los valores antes de enviar la solicitud
    console.log('Cuerpo de la solicitud:', body.toString());
    console.log('Authorization Header:', authHeader);
  
    return this.http.post(this.authTokenUrl, body.toString(), { headers }).pipe(
      tap((response: any) => {
        console.log('Respuesta de token:', response);
        if (response.access_token) {
          // Guardamos el token en memoria usando el AuthService
          this.authService.setAccessToken(response.access_token);
        } else {
          throw new Error('Access token no recibido');
        }
      }),
      catchError(error => {
        console.error('Error en la autenticación:', error);
        return throwError(() => error);
      })
    );
  }
  
  // Método para refrescar el token usando el refreshToken
  refreshToken(refreshToken: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refreshToken);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`));

    return this.http.post(this.authTokenUrl, body.toString(), { headers });
  }
  

  authorizeSpotify(): string {
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-library-read'
    ].join(' ');

    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: this.redirectUri,
      scope: scopes,
      show_dialog: 'true'
    });

    return 'https://accounts.spotify.com/authorize?' + params.toString();
  }

  searchFinancePodcasts(accessToken: string): Observable<any> {
    //const uri = 'https://api.spotify.com/v1/search';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .set('q', 'finance')
      .set('type', 'show')
      .set('market', 'ES')
      .set('limit', '20');

      //const url = `${this.apiUrl}/search`;
      // Log de la URL, parámetros y headers

      //console.log('URL de búsqueda:', uri);
      console.log('Paramas:', params.toString());
      console.log('Headers:', headers);
      console.log('Token::::',accessToken);

    return this.http.get(`${this.apiUrl}/search`, { headers, params }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud de búsqueda:', error);
        return throwError(error);
      })
    );
  }



  getPodcastEpisodes(accessToken: string, showId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get(`${this.apiUrl}/shows/${showId}/episodes`, {
      headers,
      params: {
        limit: 10
      }
    }).pipe(
      map((response: any) => response.items)
    );
  }
}