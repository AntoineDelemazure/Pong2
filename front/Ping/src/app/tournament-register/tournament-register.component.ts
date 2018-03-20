/**
 * Composant qui permet d'enregistrer un tournois dans la base de données
 * TODO : faire le lien avec le Back-end une fois celui-ci prêt.
 */


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournament-register',
  templateUrl: './tournament-register.component.html',
  styleUrls: ['./tournament-register.component.css']
})
export class TournamentRegisterComponent implements OnInit {


  tournamentName:any;
  tournamentDate:any;
  constructor() { }

  ngOnInit() {
  }

  register() {

  }

}
