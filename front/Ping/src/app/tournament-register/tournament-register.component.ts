import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {AlertService} from "../_services/alert.service";
import {Router} from "@angular/router";
import {current} from "codelyzer/util/syntaxKind";
import {User} from "../_models/user";
/**
 * Composant qui permet d'enregistrer un tournoi dans la base de données
 * TODO : faire le lien avec le Back-end une fois celui-ci prêt.
 */
@Component({
  selector: 'app-tournament-register',
  templateUrl: './tournament-register.component.html',
  styleUrls: ['./tournament-register.component.css']
})
export class TournamentRegisterComponent implements OnInit {

  /*
  * Composant utiliser pour créer un tournois
  * */

  currentUser: User;
  model: any = {};
  tournamentDate: string;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  register() {

    this.model.id = 0;
    this.model.finished = 0;
    this.model.open = 1;
    this.model.currentRound = 0;
    this.tournamentDate = `${this.tournamentDate} 00:00:00`;
    this.model.date = this.tournamentDate;


    //console.log(this.currentUser);
    this.model.referee_id = this.currentUser.id;



      this.userService.createTournament(this.model, this.currentUser.token)
        .subscribe(
          data => {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/home']);
          },
          error => {
            console.log(error);
            this.alertService.error(error);
          });
  }
}
