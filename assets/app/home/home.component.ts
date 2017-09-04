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
    private noResult = false;
    private searchValue = '';

    constructor(private itemService: ItemService) {
    };

    ngOnInit() {
        this.itemService.getAllItems()
            .subscribe(
                (items: Item[]) => {
                    this.allItems = items;
                });
    }

    search() {
        console.log(this.searchValue);
        this.noResult = false;
        this.itemService.findItems(this.searchValue)
            .subscribe(
                (result) => {
                    if (result.length == 0)
                        this.noResult = true;
                    else
                        this.allItems = result;

                },
                (error) => {
                    this.noResult = true;
                    console.log('Cant find anything');
                }
            )
    }

    onSearchValueChange() {
        if (this.searchValue == '' || this.searchValue == null) {
            this.noResult = false;
            this.itemService.getAllItems()
                .subscribe(
                    (items: Item[]) => {
                        this.allItems = items;
                    });
        }
    }
}