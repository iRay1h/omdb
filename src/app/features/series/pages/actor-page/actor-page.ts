import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { OmdbService } from '../../services/omdb';

@Component({
  selector: 'app-actor-page',
  standalone: false,
  templateUrl: './actor-page.html',
  styleUrls: ['./actor-page.scss']
})
export class ActorPage implements OnInit {
  actorName = '';
  actorData: any = null;
  error = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private omdbService: OmdbService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const actor = this.route.snapshot.paramMap.get('name');
    if (!actor) {
      this.error = true;
      return;
    }

    this.actorName = decodeURIComponent(actor);
    this.loading = true;
    this.omdbService.searchByActor(this.actorName).subscribe({
      next: response => {
        this.actorData = response;
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

  viewDetail(id: string) {
    if (id) {
      this.router.navigate(['/detail', id]);
    }
  }
}
