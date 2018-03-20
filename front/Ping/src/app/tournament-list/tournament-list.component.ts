import { Component, OnInit } from '@angular/core';
import {Tournament} from "../_models/tournament";
import {User} from "../_models/user";
import {Input} from "@angular/compiler/src/core";
import {UserService} from "../_services/user.service";
import {AlertService} from "../_services/alert.service";
import {Router} from "@angular/router";
import {Match} from "../_models/match";
import {Round} from "../_models/round";

/**
 * Composant servant à afficher la liste des tournoi
 */
@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  _tournaments: Tournament[] = [];
  private currentUser: User;

  /**
   * constructeur par défaut, qui créer des tournois factice pour tester, en attendant le lien avec le Back-end.
   */
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // this._tournaments[0] = new Tournament();
    // this._tournaments[0].name = "blablablabla";
    // this._tournaments[0].date = "01/01/2018";
    // this._tournaments[0].finished = false;
    // this._tournaments[0].open = false;
    // this._tournaments[0].currentRound = 0;
    //
    // this._tournaments[1] = new Tournament();
    // this._tournaments[1].name = "blablablabla2";
    // this._tournaments[1].date = "02/02/2018";
    // this._tournaments[1].finished = false;
    // this._tournaments[1].open = true;
    // this._tournaments[1].currentRound = 0;

  }


  private loadAllTournament() {
    this.userService.getListeTournois(this.currentUser.token).subscribe(_tournaments => { this._tournaments = _tournaments; });
  }

  ngOnInit() {

    this.loadAllTournament();

  }

}
