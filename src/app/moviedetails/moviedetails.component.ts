import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './../movies.service';



@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {

  movieId:any;
  movieDetails:any;

  imgPrefix:string = "https://image.tmdb.org/t/p/w500/";

  constructor(private _ActivatedRoute:ActivatedRoute, private _MoviesService:MoviesService) {

    this.movieId = _ActivatedRoute.snapshot.params['id'];

    this._MoviesService.getMovieDetails(this.movieId).subscribe((response)=>{
      this.movieDetails = response;
      console.log(this.movieDetails);
    })
  }

  ngOnInit(): void {
  }

}
