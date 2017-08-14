import {Http, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";

import {Item} from "../models/Item";

@Injectable()
export class ItemService {
    constructor(private http: Http){};
    private allItems: Item[] = [];

    // add an item to the database
    addItem(i: Item) {
        const body = JSON.stringify(i);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.post('http://localhost:3000/item', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const item = new Item(
                    result.obj.description);
                this.allItems.push(item);
                return item;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
