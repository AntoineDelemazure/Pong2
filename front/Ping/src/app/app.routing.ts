import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {HomeComponent} from "./home/home.component";
import {ProfilComponent} from "./profil/profil.component";
import {TournamentListComponent} from "./tournament-list/tournament-list.component";
import {TournamentDetailComponent} from "./tournament-detail/tournament-detail.component";
import {TournamentRegisterComponent} from "./tournament-register/tournament-register.component";
import {EditprofileComponent} from "./editprofile/editprofile.component";


const appRoutes: Routes = [
  { path: '', component: HomeComponent, runGuardsAndResolvers: 'always'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: ProfilComponent},
  { path: 'tournament', component: TournamentDetailComponent},
  { path: 'editprofile', component: EditprofileComponent},
  { path: 'tournament-register', component: TournamentRegisterComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'});
