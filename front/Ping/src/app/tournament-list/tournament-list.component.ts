/**
 * Composant servant à afficher la liste des tournois
 */

import { Component, OnInit } from '@angular/core';
import {Tournament} from "../_models/tournament";
import {User} from "../_models/user";
import {Input} from "@angular/compiler/src/core";
import {Match} from "../_models/match";
import {Round} from "../_models/round";

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  private _tournaments: Tournament[] = new Array<Tournament>();
  private currentUser: User;

  /**
   * constructeur par défaut, qui créer des tournois factice pour tester, en attendant le lien avec le Back-end.
   */
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._tournaments[0] = new Tournament();
    this._tournaments[0].name = "blablablabla";
    this._tournaments[0].date = "01/01/2018";
    this._tournaments[0].finished = false;
    this._tournaments[0].open = false;
    this._tournaments[0].currentRound = 2;
    this._tournaments[0].rounds = new Array<Round>();
    this._tournaments[0].rounds[0] = new Round();
    this._tournaments[0].rounds[0].matches = new Array<Match>();
    this._tournaments[0].rounds[0].matches[0] = new Match(1, 2, "pepint", "AlexD", 3, 2);
    this._tournaments[0].rounds[0].matches[1] = new Match(3, 4, "truc", "muche", 2, 3);
    this._tournaments[0].rounds[0].matches[2] = new Match(5, 6, "bidule", "chouette", 3, 0);
    this._tournaments[0].rounds[0].matches[3] = new Match(7, 8, "JL", "Antonio", 10000, 0);

    this._tournaments[0].rounds[1] = new Round();
    this._tournaments[0].rounds[1].matches = new Array<Match>();
    this._tournaments[0].rounds[1].matches[0] = new Match(1, 4, "pepint", "muche", 2, 3);
    this._tournaments[0].rounds[1].matches[1] = new Match(5, 7, "bidule", "JL", 0, 10000);

    this._tournaments[0].rounds[2] = new Round();
    this._tournaments[0].rounds[2].matches = new Array<Match>();
    this._tournaments[0].rounds[2].matches[0] = new Match(4, 7, "muche", "JL", 0, 0);

    this._tournaments[1] = new Tournament();
    this._tournaments[1].name = "blablablabla2";
    this._tournaments[1].date = "02/02/2018";
    this._tournaments[1].finished = false;
    this._tournaments[1].open = true;
    this._tournaments[1].currentRound = 0;
  }

  ngOnInit() {
  }

}
