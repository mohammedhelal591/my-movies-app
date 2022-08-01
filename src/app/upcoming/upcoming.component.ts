import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';


@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  upcoming:any;
  upcomingArray:any[] = [];
  imgPrefix:string = "https://image.tmdb.org/t/p/w500/";


  constructor(private _MoviesService:MoviesService) {


    this.upcoming = _MoviesService.getUpcoming().subscribe((upcomingData)=>{
      this.upcomingArray = upcomingData.results;
    });


  }

  ngOnInit(): void {
  }

}
