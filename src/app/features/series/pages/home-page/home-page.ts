import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OmdbService } from '../../services/omdb';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss']
})
export class HomePage implements OnInit {

  series: any[] = [];
  allSeries: any[] = [];
  error = false;
  loading = false;
  currentPage = 1;
  totalResults = 0;
  pageSize = 10;
  totalPages = 1;
  selectedGenre = 'Todos';
  selectedRating = '';
  selectedType = '';
  selectedYear = 'Todos';
  genreOptions: string[] = ['Todos'];
  typeOptions = [
    { label: 'Todos', value: '' },
    { label: 'Películas', value: 'movie' },
    { label: 'Series', value: 'series' }
  ];
  yearOptions: string[] = ['Todos'];
  ratingOptions = [
    { label: 'Todos', value: '' },
    { label: 'IMDb 8.0+', value: '8' },
    { label: 'IMDb 7.0+', value: '7' },
    { label: 'IMDb 6.0+', value: '6' },
    { label: 'Menos de 6.0', value: '0-5.9' }
  ];

  constructor(private omdbService: OmdbService) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.loading = true;
    this.error = false;

    this.omdbService.getSeries(page).subscribe({
      next: (response: any) => {
        this.loading = false;

        if (response?.Search?.length) {
          this.totalResults = parseInt(response.totalResults, 10) || 0;
          this.totalPages = Math.max(1, Math.ceil(this.totalResults / this.pageSize));
          this.allSeries = response.Search;
          this.loadSeriesDetails(this.allSeries);
          return;
        }

        this.series = [];
        this.genreOptions = ['Todos'];
        this.totalResults = 0;
        this.totalPages = 1;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }

  loadSeriesDetails(series: any[]) {
    const requests = series.map(item =>
      this.omdbService.getSeriesDetail(item.imdbID).pipe(
        catchError(() => of(item))
      )
    );

    forkJoin(requests).subscribe(details => {
      this.allSeries = details;
      this.genreOptions = this.buildGenreOptions(details);
      this.yearOptions = this.buildYearOptions(details);
      this.applyFilters();
    });
  }

  buildGenreOptions(items: any[]) {
    const genres = new Set<string>();

    items.forEach(item => {
      const genreText = item?.Genre || '';
      genreText
        .split(',')
        .map((value: string) => value.trim())
        .filter(Boolean)
        .forEach((genre: string) => genres.add(genre));
    });

    return ['Todos', ...Array.from(genres).sort()];
  }

  buildYearOptions(items: any[]) {
    const years = new Set<string>();

    items.forEach(item => {
      if (item?.Year) {
        years.add(item.Year);
      }
    });

    return ['Todos', ...Array.from(years).sort((a, b) => parseInt(b, 10) - parseInt(a, 10))];
  }

  applyFilters() {
    let filtered = [...this.allSeries];

    if (this.selectedType) {
      filtered = filtered.filter(item => item.Type === this.selectedType);
    }

    if (this.selectedGenre && this.selectedGenre !== 'Todos') {
      filtered = filtered.filter(item => (item.Genre || '').includes(this.selectedGenre));
    }

    if (this.selectedYear && this.selectedYear !== 'Todos') {
      filtered = filtered.filter(item => item.Year === this.selectedYear);
    }

    if (this.selectedRating) {
      filtered = filtered.filter(item => {
        const rating = parseFloat(item.imdbRating);

        if (Number.isNaN(rating)) {
          return false;
        }

        if (this.selectedRating === '8') {
          return rating >= 8;
        }

        if (this.selectedRating === '7') {
          return rating >= 7;
        }

        if (this.selectedRating === '6') {
          return rating >= 6;
        }

        if (this.selectedRating === '0-5.9') {
          return rating < 6;
        }

        return true;
      });
    }

    this.series = filtered;
  }

  onTypeChange(value: string) {
    this.selectedType = value;
    this.applyFilters();
  }

  onGenreChange(value: string) {
    this.selectedGenre = value;
    this.applyFilters();
  }

  onYearChange(value: string) {
    this.selectedYear = value;
    this.applyFilters();
  }

  onRatingChange(value: string) {
    this.selectedRating = value;
    this.applyFilters();
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.loadPage(this.currentPage - 1);
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadPage(this.currentPage + 1);
    }
  }

  get pageLabel() {
    return `${this.currentPage} de ${this.totalPages}`;
  }

}