import {ChangeDetectorRef, Component} from '@angular/core';
import {User} from "./_models/user";
import {UserService} from "./_services/user.service";
import {AuthenticationService} from "./_services/authentication.service";
import {Router} from "@angular/router";
/**
 * Composant qui gère la barre de navigation ainsi que le "router-outlet" qui affiche
 * les différents composants lors de la navigation sur le site
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  users: User[] = [];
  title = 'app';

  constructor(private userService: UserService,
              private authentificationService: AuthenticationService,
              private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * permet de récupérer l'utilisateur courant (c.à.d connecté) à chaque changement de composant dans le router-outlet
   */
  onActivate(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * Gère la déconnexion à partir du lien de la barre de navigation
   */
  private logout(){
    this.authentificationService.logout();
    this.router.navigate(["['/']"]);
  }

}
