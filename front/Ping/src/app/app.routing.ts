import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {HomeComponent} from "./home/home.component";
import {InvitationComponent} from "./invitation/invitation.component";
import {ProfilComponent} from "./profil/profil.component";
import {TournamentListComponent} from "./tournament-list/tournament-list.component";
import {TournamentDetailComponent} from "./tournament-detail/tournament-detail.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: ProfilComponent},
  { path: 'tournament', component: TournamentDetailComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
