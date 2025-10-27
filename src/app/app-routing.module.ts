import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SeriesComponent } from './series/series.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { PopularComponent } from './popular/popular.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { SerieDetailsComponent } from './serie-details/serie-details.component';




const routes: Routes = [
  {path:'', redirectTo:'register', pathMatch:'full'},
  {path:'home', canActivate:[AuthGuard] ,component:HomeComponent},
  {path:'movies', canActivate:[AuthGuard], component:MoviesComponent},
  {path:'series', canActivate:[AuthGuard], component:SeriesComponent},
  {path:'top-rated', canActivate:[AuthGuard], component:TopRatedComponent},
  {path:'upcoming', canActivate:[AuthGuard], component:UpcomingComponent},
  {path:'popular', canActivate:[AuthGuard], component:PopularComponent},
  {path:'now-playing', canActivate:[AuthGuard], component:NowPlayingComponent},
  {path:'moviedetails/:id', canActivate:[AuthGuard], component:MoviedetailsComponent},
  {path:'seriedetails/:id', canActivate:[AuthGuard], component:SerieDetailsComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
