import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  private apiKey = '9ae38123';

  constructor(private http: HttpClient) {}

  getSeries(page = 1) {
    return this.http.get(
      `https://www.omdbapi.com/?s=rookie&page=${page}&apikey=${this.apiKey}`
    );
  }

  getSeriesDetail(id: string) {
    return this.http.get(
      `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${this.apiKey}`
    );
  }

  getSeasonDetails(id: string, season: number) {
    return this.http.get(
      `https://www.omdbapi.com/?i=${id}&Season=${season}&apikey=${this.apiKey}`
    );
  }

  searchByActor(actor: string, page = 1) {
    return this.http.get(
      `https://www.omdbapi.com/?s=${encodeURIComponent(actor)}&page=${page}&apikey=${this.apiKey}`
    );
  }

}