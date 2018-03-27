import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Tournament} from "../../_models/tournament";
import {User} from "../../_models/user";

/**
 * Composant servant à afficher les tournois sous forme de carte
 *
 */
@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {

  @Input() tournament: any;
  currentUser: User;

  dateFormate: string;

  /**
   * constructeur par défaut qui permet de récupérer l'utilisateur courant.
   */
  constructor() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);


    // this.dateFormate = this.tournament.date;
    // this.dateFormate = this.dateFormate.substring(0, 10);

  }

  ngOnInit() {

    this.dateFormate = this.tournament.date;
    this.dateFormate = this.dateFormate.substring(0, 10);
  }

}
