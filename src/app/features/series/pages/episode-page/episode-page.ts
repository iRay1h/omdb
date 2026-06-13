import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OmdbService } from '../../services/omdb';

@Component({
  selector: 'app-episode-page',
  standalone: false,
  templateUrl: './episode-page.html',
  styleUrls: ['./episode-page.scss']
})
export class EpisodePage implements OnInit {
  detail: any = null;
  error = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private omdbService: OmdbService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = true;
      return;
    }

    this.loading = true;
    this.omdbService.getSeriesDetail(id).subscribe({
      next: response => {
        this.detail = response;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  goBack() {
    this.location.back();
  }

  actorList() {
    return (this.detail?.Actors || '').split(',').map((actor: string) => actor.trim()).filter(Boolean);
  }

  viewActor(actor: string) {
    if (actor) {
      window.location.href = `/actor/${encodeURIComponent(actor)}`;
    }
  }
}
