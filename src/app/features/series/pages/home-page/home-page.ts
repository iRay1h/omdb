import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../../services/omdb';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss']
})
export class HomePage implements OnInit {

  series: any[] = [];
  error = false;

  constructor(private omdbService: OmdbService) {}

  ngOnInit(): void {

    this.omdbService.getSeries().subscribe({
      next: (response: any) => {

        if (response.Search) {
          this.series = response.Search;
        }

      },

      error: () => {
        this.error = true;
      }
    });

  }

}