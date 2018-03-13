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
