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

    getAllItems() {
        let item1 = new Item('Item 1');
        let item2 = new Item('Item 2');
        let item3 = new Item('Item 3');
        let item4 = new Item('Item 4');
        let item5 = new Item('Item 5');
        let item6 = new Item('Item 6');
        let item7 = new Item('Item 7');
        this.allItems.push(item1);
        this.allItems.push(item2);
        this.allItems.push(item3);
        this.allItems.push(item4);
        this.allItems.push(item5);
        this.allItems.push(item6);
        this.allItems.push(item7);
        return this.allItems;
    }
}
