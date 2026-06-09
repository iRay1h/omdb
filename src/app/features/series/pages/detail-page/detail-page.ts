import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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

  constructor(
    private route: ActivatedRoute,
    private omdbService: OmdbService,
    private location: Location
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.omdbService.getSeriesDetail(id).subscribe({
        next: (response) => {
          this.detail = response;
        },
        error: () => {
          this.error = true;
        }
      });
    }

  }

  goBack(): void {
    this.location.back();
  }

}