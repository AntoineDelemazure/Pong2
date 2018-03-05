/**
 * Composant servant à afficher les tournois sous forme de carte
 *
 */

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {

  @Input() tournament: any;

  constructor() {
    this.tournament = {};
  }

  ngOnInit() {
  }

}
