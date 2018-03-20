/**
 * Composant servant à afficher les tournois sous forme de carte
 *
 */

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Tournament} from "../../_models/tournament";
import {TournamentDetailService} from "../../_services/tournamentDetail.service";
import {User} from "../../_models/user";

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit, OnDestroy {

  @Input() tournament: any;
  currentUser: User;

  /**
   * constructeur par défaut qui permet de récupérer l'utilisateur courant.
   */
  constructor(private tournamentService:  TournamentDetailService) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.tournamentService.tournament = this.tournament;
  }

}
