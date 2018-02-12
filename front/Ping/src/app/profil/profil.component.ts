import { Component, OnInit } from '@angular/core';


import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService,
              private authentificationService: AuthenticationService,
              private router:Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
  }

  private logout(){
    this.authentificationService.logout();
    this.router.navigate(["['/']"]);
  }

}
