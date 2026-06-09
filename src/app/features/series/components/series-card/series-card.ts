import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series-card',
  standalone: false,
  templateUrl: './series-card.html',
  styleUrl: './series-card.scss'
})
export class SeriesCard {

  @Input()
  serie: any;

  constructor(private router: Router) {}

  goToDetail() {
    this.router.navigate(['/detail', this.serie.imdbID]);
  }

}