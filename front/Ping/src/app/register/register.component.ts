/**
 * création d'un nouveau utilisateur
 * le formulaire d'ajout d'un utilisateur est dans register.component.html
 */

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import {FormControl, FormGroup} from "@angular/forms";
/**
 * création d'un nouvel utilisateur avec un formulaire d'inscription(nom, prenom, email, rang, nom d'utilisateur et mot de passe, confirmation du mot de passe) avec des tests de validation à l'aide des pattern
 *
 * La classe UserService permet de créer un utilisateur en appelant la fonction create qui prend comme paramètres un utilisateur.
 */
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

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


  ngOnInit() {


  }
    register() {

     let isValid = true;

      if (!(this.model.password === this.passwordconfirm)){
        console.log(this.model.password);
        console.log(this.passwordconfirm);
        this.message = 'La confirmation de mot de passe ne correspondent pas';
        isValid = false;
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
