import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';


@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit {


  nowPlaying:any;
  nowPlayingArray:any[] = [];
  imgPrefix:string = "https://image.tmdb.org/t/p/w500/";


  constructor(private _MoviesService:MoviesService) {
    this.nowPlaying = _MoviesService.getNowPlaying().subscribe((nowplayingData)=>{
      this.nowPlayingArray = nowplayingData.results;
    });
  }

  ngOnInit(): void {
  }

}
