import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OmdbService } from '../../services/omdb';

@Component({
  selector: 'app-detail-page',
  standalone: false,
  templateUrl: './detail-page.html',
  styleUrls: ['./detail-page.scss']
})
export class DetailPage implements OnInit {

  detail: any = null;
  error = false;
  selectedSeason = 1;
  seasonEpisodes: any[] = [];
  episodeDetails: any[] = [];
  seasonLoading = false;
  seasonError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private omdbService: OmdbService,
    private location: Location
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.omdbService.getSeriesDetail(id).subscribe({
        next: (response) => {
          this.detail = response;
          if (this.detail?.Type === 'series') {
            this.selectedSeason = 1;
            this.loadSeason(this.selectedSeason);
          }
        },
        error: () => {
          this.error = true;
        }
      });
    }

  }

  get seasonOptions(): number[] {
    const seasons = parseInt(this.detail?.totalSeasons, 10);
    if (!seasons || seasons <= 0) {
      return [];
    }
    return Array.from({ length: seasons }, (_, index) => index + 1);
  }

  loadSeason(season: number) {
    if (!this.detail?.imdbID) {
      return;
    }

    this.seasonLoading = true;
    this.seasonError = false;
    this.seasonEpisodes = [];
    this.episodeDetails = [];

    this.omdbService.getSeasonDetails(this.detail.imdbID, season).subscribe({
      next: (response: any) => {
        this.seasonEpisodes = response?.Episodes || [];
        if (this.seasonEpisodes.length) {
          const detailsRequests = this.seasonEpisodes.map((episode: any) =>
            this.omdbService.getSeriesDetail(episode.imdbID).pipe(
              catchError(() => of(episode))
            )
          );

          forkJoin(detailsRequests).subscribe(detailResults => {
            this.episodeDetails = detailResults;
            this.seasonLoading = false;
          });
        } else {
          this.seasonLoading = false;
        }
      },
      error: () => {
        this.seasonError = true;
        this.seasonLoading = false;
      }
    });
  }

  selectSeason(season: number) {
    this.selectedSeason = season;
    this.loadSeason(season);
  }

  viewEpisode(episode: any) {
    if (episode?.imdbID) {
      this.router.navigate(['/episode', episode.imdbID]);
    }
  }

  viewActor(actor: string) {
    if (actor) {
      this.router.navigate(['/actor', encodeURIComponent(actor)]);
    }
  }

  goBack(): void {
    this.location.back();
  }

}