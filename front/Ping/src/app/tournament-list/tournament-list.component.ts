/**
 * Composant servant à afficher la liste des tournois
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-tournois',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class ListeTournoisComponent implements OnInit {

  tournament;

  constructor() { }

  ngOnInit() {
  }

}