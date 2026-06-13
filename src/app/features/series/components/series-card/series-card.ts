import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series-card',
  standalone: false,
  templateUrl: './series-card.html',
  styleUrls: ['./series-card.scss']
})
export class SeriesCard {

  @Input()
  serie: any;

  hasImageError = false;

  constructor(private router: Router) {}

  onImageError() {
    this.hasImageError = true;
  }

  goToDetail() {
    this.router.navigate(['/detail', this.serie.imdbID]);
  }

}