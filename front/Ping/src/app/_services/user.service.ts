import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../_models/index';
import {Tournament} from "../_models/tournament";

/*
* Regroupement des fonction pour les call du back
* */

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('http://localhost:1337/api/players');
    }

    getById(id: number) {
        return this.http.get('http://localhost:1337/api/players' + id);
    }

    create(user: User) {
      return this.http.post('http://localhost:1337/api/signup', user);
    }

    update(user: User) {
        return this.http.put('http://localhost:1337/api/players' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('http://localhost:1337/api/players' + id);
    }

    //Requete pour creer un tournois et l'ajouter dans la bdd

    createTournament(tournament: Tournament, token: string) {

      return this.http.post('http://localhost:1337/api/tournaments', tournament,{
        headers: new HttpHeaders().set('token', token)});

    }

    getListeTournois(token: string) {
      return this.http.get<Tournament[]>('http://localhost:1337/api/tournaments',{
        headers: new HttpHeaders().set('token', token)});
    }

    getTournamentById(id: number, token: string){
      return this.http.get('http://localhost:1337/api/tournaments' + id,{
        headers: new HttpHeaders().set('token', token)});
    }
}
