/**
 * création d'un nouveau utilisateur
 * le formulaire d'ajout d'un utilisateur est dans register.component.html
 */

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import {FormControl, FormGroup} from "@angular/forms";



@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})
/**
 * Composant utilisé pour enregistrer un nouvelle utilisateur
 */
export class RegisterComponent implements  OnInit{
    model: any = {};

    passwordconfirm: any;
    loading = false;
    message: any;

  private sampleForm: FormGroup;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }


  ngOnInit():void {


  }

  /**
   * la classe UserService permet de créer un utilisateur en appelant la fonction create qui prend comme parametres un utilisateur
   */
    register() {

     var isValid=true;

      if(!(this.model.password === this.passwordconfirm)){
        console.log(this.model.password);
        console.log(this.passwordconfirm);
        this.message="La confirmation de mot de passe ne correspondent pas";
        isValid=false;
      }


      if(isValid) {
        this.loading = true;
        this.userService.create(this.model)
          .subscribe(
            data => {
              this.alertService.success('Registration successful', true);
              this.router.navigate(['/login']);
            },
            error => {
              console.log(error);
              this.alertService.error(error);
              this.loading = false;
            });
      }

    }
}
