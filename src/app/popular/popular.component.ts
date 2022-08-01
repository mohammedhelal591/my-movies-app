import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';


@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {


  popular:any;
  popularArray:any[] = [];
  imgPrefix:string = "https://image.tmdb.org/t/p/w500/";


  constructor(private _MoviesService:MoviesService) {

    this.popular = _MoviesService.getPopular().subscribe((popularData)=>{
      this.popularArray = popularData.results;
    });


  }

  ngOnInit(): void {
  }

}
