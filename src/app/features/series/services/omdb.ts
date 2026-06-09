import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  private apiKey = '9ae38123';

  constructor(private http: HttpClient) {}

  getSeries() {
    return this.http.get(
      `https://www.omdbapi.com/?s=rookie&apikey=${this.apiKey}`
    );
  }

  getSeriesDetail(id: string) {
    return this.http.get(
      `https://www.omdbapi.com/?i=${id}&apikey=${this.apiKey}`
    );
  }

}