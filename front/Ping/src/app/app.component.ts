import { Component } from '@angular/core';
import {User} from "./_models/user";
import {UserService} from "./_services/user.service";
import {AuthenticationService} from "./_services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  users: User[] = [];
  title = 'app';

  constructor(private userService: UserService,
              private authentificationService: AuthenticationService,
              private router:Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  onActivate(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


  private logout(){
    this.authentificationService.logout();
    this.router.navigate(["['/']"]);
  }

}
