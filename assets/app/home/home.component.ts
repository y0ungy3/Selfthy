import {Component, OnInit} from "@angular/core";
import {ItemService} from "../services/item.service";
import {Item} from "../models/Item";
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    allItems: Item[] = [];

    constructor(private itemService: ItemService){};

    ngOnInit() {
        this.itemService.getAllItems()
            .subscribe(
            (items: Item[]) => {
                this.allItems = items;
            });
    }
}