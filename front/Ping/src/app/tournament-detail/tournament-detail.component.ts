import { Component, OnInit } from '@angular/core';
import {Tournament} from "../_models/tournament";
import {Round} from "../_models/round";
import {Match} from "../_models/match";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";

/**
 * Composant servant à l'affichage en détail d'un tournoi
 * Affiche la liste des inscrits si le tournoi n'est pas commencé
 * Affiche l'arbre de tournoi et les scores des matches si il est commencé
 */

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {


  private tournament: any;
  private playerList: String[] = new Array<String>();
  private currentUser: User;

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  /**
   * constructeur par défaut, qui créer un tournoi factice en attendant qu'on puisse faire le lien avec le Back-end
   */
  ngOnInit() {

    // this.tournament = this.userService.getTournamentById(1, this.currentUser.token).subscribe(tournament => {this.tournament = tournament;});

    this.tournament = new Tournament();
    this.tournament.name = "blablabla";
    this.tournament.currentRound = 1;
    this.tournament.open = false;
    this.tournament.finished = false;
    this.tournament.rounds = new Array<Round>();
    this.tournament.rounds[0] = new Round();
    this.tournament.rounds[0].matches = new Array<Match>();
    this.tournament.rounds[0].matches[0] = new Match(1, 2, "pepint", "AlexD", 3, 2);
    this.tournament.rounds[0].matches[1] = new Match(3, 4, "truc", "muche", 2, 3);
    this.tournament.rounds[0].matches[2] = new Match(5, 6, "bidule", "chouette", 3, 0);
    this.tournament.rounds[0].matches[3] = new Match(7, 8, "JL", "Antonio", 10000, 0);

    this.tournament.rounds[1] = new Round();
    this.tournament.rounds[1].matches = new Array<Match>();
    this.tournament.rounds[1].matches[0] = new Match(1, 4, "pepint", "muche", 2, 3);
    this.tournament.rounds[1].matches[1] = new Match(5, 7, "bidule", "JL", 0, 10000);

    this.tournament.rounds[2] = new Round();
    this.tournament.rounds[2].matches = new Array<Match>();
    this.tournament.rounds[2].matches[0] = new Match(4, 7, "muche", "JL", 0, 0);


    for (const match of this.tournament.rounds[0].matches)
    {
      if (!this.playerList.includes(match.nom1))
      {
        this.playerList.push(match.nom1);
      }

      if (!this.playerList.includes(match.nom2))
      {
        this.playerList.push(match.nom2);
      }
    }


  }

}
