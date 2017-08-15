import {Component, OnInit} from "@angular/core";
import {ItemService} from "../services/item.service";
import {Item} from "../models/Item";
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    private allItems: Item[] = [];

    constructor(private itemService: ItemService){};

    ngOnInit() {
        this.allItems = this.itemService.getAllItems();
    }
}