/**
 * Composant servant à afficher la liste des tournois
 */

import { Component, OnInit } from '@angular/core';
import {Tournament} from "../_models/tournament";

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  private _tournaments: Tournament[] = new Array<Tournament>();

  constructor() {
    this._tournaments[0] = new Tournament();
    this._tournaments[0].name = "blablablabla";
    this._tournaments[0].date = "01/01/2018";
    this._tournaments[0].finished = false;
    this._tournaments[0].open = false;
    this._tournaments[0].currentRound = 0;

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
