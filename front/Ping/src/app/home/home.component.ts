import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {AuthenticationService} from '../_services/authentication.service';
import {NavigationEnd, Router} from '@angular/router';

/**
 * Affichage de message de bienvenue si l'utilisateur n'est pas connecté.
 *
 * Affichage de la liste des tournois si l'utilisateur est connecté
 *
 */
@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html'

})



export class HomeComponent implements OnInit {
    navigationSubscription;
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService,
    private authentificationService: AuthenticationService,
                private router: Router
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialiseInvites();
        }
      });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    initialiseInvites() {
      this.ngOnInit();
    }
    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private logout() {
      this.authentificationService.logout();
      this.router.navigate(['[\'/\']']);
    }
}
