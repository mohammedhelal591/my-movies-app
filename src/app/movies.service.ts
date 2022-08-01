import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClilent:HttpClient) {}


  getTrending(mediaType:string):Observable<any> {
    return this._HttpClilent.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=d20b2444f990fbb72e09312c55d2105b`);
  };


  getNowPlaying():Observable<any> {
    return this._HttpClilent.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=d20b2444f990fbb72e09312c55d2105b`);
  };

  getPopular():Observable<any> {
    return this._HttpClilent.get(`https://api.themoviedb.org/3/movie/popular?api_key=d20b2444f990fbb72e09312c55d2105b`);
  };

  getToprated():Observable<any> {
    return this._HttpClilent.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=d20b2444f990fbb72e09312c55d2105b`);
  };

  getUpcoming():Observable<any> {
    return this._HttpClilent.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=d20b2444f990fbb72e09312c55d2105b`);
  }

  getMovieDetails(id:any):Observable<any>{
    return this._HttpClilent.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d20b2444f990fbb72e09312c55d2105b`);
  }



}
