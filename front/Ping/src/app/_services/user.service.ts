import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';

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
      return this.http.post('http://localhost:1337/api/signup',user);
    }

    update(user: User) {
        return this.http.put('http://localhost:1337/api/players' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('http://localhost:1337/api/players' + id);
    }
}
