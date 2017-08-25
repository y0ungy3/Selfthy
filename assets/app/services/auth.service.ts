import {Http, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";

import {User} from "../models/User";
import {ErrorService} from "./error.service";

@Injectable()
export class AuthService {

    private user: User;

    constructor(private http: Http, private errorService: ErrorService){};

    register(user: User) {
        let body = JSON.stringify(user);
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    login(user: User) {
        let body = JSON.stringify(user);
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/login', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    logout() {
        //clear the JWT
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                resolve(this.isLoggedIn());
            }
        );
        return promise;
    }

    getUser(username: String) {
        return this.http.get('http://localhost:3000/user/' + username )
            .map((response: Response) => {
                const user = response.json().obj;
                const transformedUser = new User(
                        user[0].username,
                        null,
                        user[0].description,
                        user[0].picture,
                        user[0].links,
                        user[0]._id,
                        user[0].items,
                        user[0].views
                );
                this.user = transformedUser;
                return transformedUser;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch('http://localhost:3000/user/' + user.userId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getUsername() {
        return localStorage.getItem('username');
    }
}