import {Http, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";

import {User} from "../models/User";
import {ErrorService} from "./error.service";

@Injectable()
export class AuthService {

    constructor(private http: Http, private errorService: ErrorService) {};

    register(user: User) {
        let body = JSON.stringify(user);
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

    login(user: User) {
        let body = JSON.stringify(user);
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/login', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
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
        return this.http.get('http://localhost:3000/user/' + username)
            .map((response: Response) => {
                const user = response.json().obj;
                const transformedUser = new User(
                    user.username,
                    null,
                    user.description,
                    user.views,
                    user._id
                );
                return transformedUser;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // update user's description and profile pic
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

    updateView(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/user/views/' + user.username, body, {headers: headers})
            .map((response: Response) => {
                const user = response.json().obj;
                return user.views;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getUsername() {
        return localStorage.getItem('username');
    }

    deleteAccount() {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('http://localhost:3000/user/' + this.getUsername() + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}