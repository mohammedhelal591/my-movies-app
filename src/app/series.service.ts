import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  constructor(private _HttpClilent: HttpClient) {}

  getMovieDetails(serieId: any): Observable<any> {
    return this._HttpClilent.get(
      `https://api.themoviedb.org/3/tv/${serieId}?api_key=d20b2444f990fbb72e09312c55d2105b`
    );
  }

  getTrailer(serieId: number): Observable<any> {
    return this._HttpClilent.get(
      `https://api.themoviedb.org/3/tv/${serieId}/videos?api_key=d20b2444f990fbb72e09312c55d2105b`
    );
  }
}
