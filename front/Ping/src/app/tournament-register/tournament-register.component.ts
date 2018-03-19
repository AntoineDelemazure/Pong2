import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {AlertService} from "../_services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tournament-register',
  templateUrl: './tournament-register.component.html',
  styleUrls: ['./tournament-register.component.css']
})
export class TournamentRegisterComponent implements OnInit {

  /*
  * Composant utiliser pour créer un tournois
  * */

  model: any = {};

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    this.model.id = 0;
    this.model.finished = false;
    this.model.open = true;
    this.model.currentRound = 0;

      this.userService.createTournament(this.model)
        .subscribe(
          data => {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            console.log(error);
            this.alertService.error(error);
          });

  }

}
