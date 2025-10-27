import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrls: ['./serie-details.component.css'],
})
export class SerieDetailsComponent {
  serieId: any;
  serieDetails: any;

  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';

  trailer: any;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _SeriesService: SeriesService,
    private sanitizer: DomSanitizer
  ) {
    this.serieId = this._ActivatedRoute.snapshot.params['id'];

    this._SeriesService.getMovieDetails(this.serieId).subscribe({
      next: (response) => {
        this.serieDetails = response;
      },
    });

    this._SeriesService.getTrailer(this.serieId).subscribe({
      next: (response) => {
        // Example: Assume 'response' is your API result
        const results = response.results;
        const mainTrailer = results.find(
          (trailer: any) =>
            trailer.type === 'Trailer' &&
            trailer.site === 'YouTube' &&
            trailer.official === true
        );
        this.trailer = mainTrailer;
      },
    });
  }

  getSafeTrailerUrl(key: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${key}`
    );
  }

  getTrailerUrl(key: string): string {
    return `https://www.youtube.com/embed/${key}`;
  }
}
