import { Component, OnInit, OnChanges , OnDestroy, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MoviesService } from './../movies.service';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  trendingMoviesData:any = [];
  trendingMovies:any;


  trendingSeriesData:any = [];
  trendingSeries:any;

  term:string = '';

  imgPrefix:string = "https://image.tmdb.org/t/p/w500/";

  constructor( _MoviesService:MoviesService, private _Router:Router) {     
    this.trendingMovies = _MoviesService.getTrending('movie').subscribe((moviesData)=>{
      this.trendingMoviesData = moviesData.results.slice(0,10);
    });
    
    this.trendingSeries = _MoviesService.getTrending('tv').subscribe((SeriesData)=>{
      this.trendingSeriesData = SeriesData.results.slice(0,10);
    });
  };
  
  ngOnInit(): void {
  }



  ngOnDestroy(): void {
    this.trendingMovies.unsubscribe()
    this.trendingSeries.unsubscribe()
  }

  navigateToDetails() {
    this._Router.navigate(['/moviedetails']);
  }

}
