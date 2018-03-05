/**
 * Composant servant à afficher les tournois sous forme de carte
 *
 */

import {Component, Input, OnInit} from '@angular/core';
import {tournament} from "../../_models/tournament";

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {

  private current_tournament: tournament;
  //@Input() tournament: tournament;

  constructor() {
    this.current_tournament = new tournament();

    this.current_tournament.name = "blablablabla";
    this.current_tournament.date = "01/01/2018";
    this.current_tournament.finished = false;
    this.current_tournament.open = false;
    this.current_tournament.tour = 0;
  }

  ngOnInit() {
  }

}
