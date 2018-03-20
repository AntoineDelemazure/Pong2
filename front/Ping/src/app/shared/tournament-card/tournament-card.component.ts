import {Component, Input, OnInit} from '@angular/core';
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

  /**
   * constructeur par défaut qui permet de récupérer l'utilisateur courant.
   */
  constructor() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
  }

  ngOnInit() {
  }

}
