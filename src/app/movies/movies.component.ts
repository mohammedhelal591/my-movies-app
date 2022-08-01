import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  
  moviesArray:any[] = [];
  moviesContainer:any;

  imgPrefix:string = "https://image.tmdb.org/t/p/w500/";


  constructor( _MoviesService:MoviesService) {

    this.moviesContainer = _MoviesService.getTrending('movie').subscribe((movieData)=>{
      this.moviesArray = movieData.results;
    });
  }

  ngOnInit(): void {
  }

}
