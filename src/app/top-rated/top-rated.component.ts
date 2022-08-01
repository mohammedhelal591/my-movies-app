import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';


@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {


  topRated:any;
  topRatedArray:any[] = [];

  imgPrefix:string = "https://image.tmdb.org/t/p/w500/";




  constructor(private _MoviesService:MoviesService) {

    this.topRated = _MoviesService.getToprated().subscribe((topratedData)=>{
      this.topRatedArray = topratedData.results;
    });
  }

  ngOnInit(): void {
  }

}
