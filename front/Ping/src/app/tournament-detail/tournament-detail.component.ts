/**
 * Composant servant à l'affichage en détail d'un tournois
 * Affiche la liste des inscrits si le tournois n'est pas commencé
 * Affiche l'arbre de tournois et les scores des matches si il est commencé
 */

import { Component, OnInit } from '@angular/core';
import {tournament} from "../_models/tournament";

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {


  private tournament: any = {};


  constructor() {
    this.tournament = new tournament();
    this.tournament.name = "blablabla";
    this.tournament.tour = 1;
    this.tournament.open = false;
    this.tournament.finished = false;


  }

  ngOnInit() {
  }

}
