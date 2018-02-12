import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {fakeBackendProvider} from "./_helpers/fake-backend";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserService} from "./_services/user.service";
import {AuthenticationService} from "./_services/authentication.service";
import {AuthGuard} from "./_guards/auth.guard";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AlertComponent} from "./_directives/alert.component";
import {AlertService} from "./_services/alert.service";
import {FormsModule} from "@angular/forms";
import {routing} from './app.routing';
import { HomeComponent } from './home/home.component';
import { InvitationComponent } from './invitation/invitation.component';
import { ProfilComponent } from './profil/profil.component';
import { ConsulterProfilComponent } from './consulter-profil/consulter-profil.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    InvitationComponent,
    ProfilComponent,
    ConsulterProfilComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
