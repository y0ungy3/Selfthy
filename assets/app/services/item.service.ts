import {Http, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";

import {Item} from "../models/Item";
import {ErrorService} from "./error.service";

@Injectable()
export class ItemService {
    constructor(private http: Http, private errorService: ErrorService) {
    };

    private allItems: Item[] = [];

    // add an item to the database
    addItem(i: any) {
        const body = JSON.stringify(i);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('http://localhost:3000/item' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const item = new Item(
                    result.obj.picture,
                    result.obj.description,
                    result.obj.createdAt,
                    result.obj._id,
                    result.obj.user.username
                );
                this.allItems.push(item);
                return item;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getAllItems() {
        return this.http.get('http://localhost:3000/item')
            .map((response: Response) => {
                const items = response.json().obj;
                let transformedItems: Item[] = [];
                for (let item of items) {
                    console.log(item);
                    transformedItems.push(new Item(
                        item.picture,
                        item.description,
                        item.createdAt,
                        item._id,
                        item.user.username
                    ))
                }
                this.allItems = transformedItems;
                return transformedItems;
            });
            /*.catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });*/

    }
}
