import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private apiUrl = 'http://localhost:3000/api/twitter/tweets'; // URL de tu API

  constructor(private http: HttpClient) {}

  getTweets(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
