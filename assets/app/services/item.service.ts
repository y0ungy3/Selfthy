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

    // add an item to the database
    addItem(i: any) {
        const body = JSON.stringify(i);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('http://localhost:3000/item' + token, body, {headers: headers})
            .map((response: Response) => response.json())
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
                    transformedItems.push(new Item(
                        item.picture,
                        item.description,
                        item.createdAt,
                        item._id,
                        item.user.username,
                        item.tags
                    ))
                }
                this.allItems = transformedItems;
                return transformedItems;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // get all posts for a particular user
    getItems(userId: String) {
        return this.http.get('http://localhost:3000/item/' + userId)
            .map((response: Response) => {
                const items = response.json().obj;
                let transformedItems: Item[] = [];
                for (let item of items) {
                    transformedItems.push(new Item(
                        item.picture,
                        item.description,
                        item.createdAt,
                        item._id,
                        item.user.username,
                        item.tags
                    ))
                }
                return transformedItems;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteItem(item: Item) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('http://localhost:3000/item/' + item.itemID + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    findItems(tag: String) {
        return this.http.get('http://localhost:3000/item/search/' + tag)
            .map((response: Response) => {
                const items = response.json().obj;
                let transformedItems: Item[] = [];
                for (let item of items) {
                    transformedItems.push(new Item(
                        item.picture,
                        item.description,
                        item.createdAt,
                        item._id,
                        item.user.username,
                        item.tags
                    ))
                }
                console.log(transformedItems);
                return transformedItems;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }
}
