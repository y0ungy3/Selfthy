import {Http, Headers, Response} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";

import {ErrorService} from "./error.service";
import {SocialMedia} from "../models/SocialMedia";

@Injectable()
export class SocialMediaService {
    constructor(private http: Http, private errorService: ErrorService) {
    };

    socialUpdated = new EventEmitter<String>();

    // add an item to the database
    addSocialMedia(social: SocialMedia) {
        const body = JSON.stringify(social);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('http://localhost:3000/socialMedia' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const social = new SocialMedia(
                    result.obj.link,
                    result.obj.title,
                    result.obj.description,
                    result.obj._id,
                    result.obj.user.userId
                );
                return social;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    // get all websites for a particular user
    getSocialMedias(userId: String) {
        return this.http.get('http://localhost:3000/socialMedia/' + userId)
            .map((response: Response) => {
                const socialMedias = response.json().obj;
                let transformedMedias: SocialMedia[] = [];
                for (let social of socialMedias) {
                    transformedMedias.push(new SocialMedia(
                        social.link,
                        social.title,
                        social.description,
                        social._id,
                        social.user.userId
                    ))
                }
                return transformedMedias;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // delete the social website on the back end only
    deleteSocialMedia(social: SocialMedia) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('http://localhost:3000/socialMedia/' + social.socialMediaID + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}
