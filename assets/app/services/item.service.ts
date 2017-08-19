import {Http, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";

import {Item} from "../models/Item";

@Injectable()
export class ItemService {
    constructor(private http: Http) {
    };

    private allItems: Item[] = [];

    // add an item to the database
    addItem(i: any) {
        const body = JSON.stringify(i);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/item', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const item = new Item(
                    result.obj.picture,
                    result.obj.description,
                    result.obj.createdAt,
                    result.obj.itemID);
                this.allItems.push(item);
                return item;
            });
            //.catch((error: Response) => Observable.throw(error.json()));
    }

    getAllItems() {
        return this.http.get('http://localhost:3000/item')
            .map((response: Response) => {
                const items = response.json().obj;
                let transformedItems: Item[] = [];
                for (let item of items) {
                    transformedItems.push(new Item(
                        item.picture,
                        item.description))
                }
                this.allItems = transformedItems;
                return transformedItems;
            });
            //.catch((error: Response) => Observable.throw(error.json()));

    }
}
