import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    url: string;

    listUser(): Observable<any> {

        this.url = 'assets/user.json';

        return this.http.get(this.url);
    }
}
