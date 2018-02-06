import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {HomeComponent} from "./home/home.component";
import {InvitationComponent} from "./invitation/invitation.component";
import {ProfilComponent} from "./profil/profil.component";

const appRoutes: Routes = [
  { path: '', component: InvitationComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // chemin test profil
  { path:'profil', component: ProfilComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
