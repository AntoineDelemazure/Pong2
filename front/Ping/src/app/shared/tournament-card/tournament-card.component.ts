/**
 * Composant servant à afficher les tournois sous forme de carte
 *
 */

import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from "../../_models/tournament";

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {

  //private tournament: any = {};
  @Input() tournament: any;

  constructor() {
  }

  ngOnInit() {
  }

}
