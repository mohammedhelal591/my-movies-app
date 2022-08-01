import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {


  tvSeriesArray:any = [];
  tvSeriesContainer:any;


  imgPrefix:string = "https://image.tmdb.org/t/p/w500/";

  constructor(_MoviesService:MoviesService) {
    this.tvSeriesContainer = _MoviesService.getTrending('tv').subscribe((SeriesData)=>{
      this.tvSeriesArray = SeriesData.results.slice(0,10);
    });
  }

  ngOnInit(): void {
  }

}
