import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../_services/user.service";
import {AlertService} from "../_services/alert.service";
import {AuthenticationService} from "../_services/authentication.service";
import {User} from "../_models/user";
/**
* Modification des informations de l'utilisateur courant (nom, prenom, email et nom d'utilisateur)
*/

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})


export class EditprofileComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  model: any = {};
  loading = false;
  ngOnInit():void {


  }
  constructor(private userService: UserService,
              private authentificationService: AuthenticationService,
              private router:Router
  )
  {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser.id);
  }

}



