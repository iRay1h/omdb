import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-series-list',
  standalone: false,
  templateUrl: './series-list.html',
  styleUrls: ['./series-list.scss']
})
export class SeriesList {

  @Input()
  series: any[] = [];

}