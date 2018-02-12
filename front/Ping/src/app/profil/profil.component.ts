import { Component, OnInit } from '@angular/core';


import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";
/**
 * Affiche les informations d'un utilisateur
 */

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  /**
   * Recupere le current user
   * @param {UserService} userService
   * @param {AuthenticationService} authentificationService
   * @param {Router} router
   */
  constructor(private userService: UserService,
              private authentificationService: AuthenticationService,
              private router:Router
  )
  {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }


  private logout(){
    this.authentificationService.logout();
    this.router.navigate(["['/']"]);
  }

}
