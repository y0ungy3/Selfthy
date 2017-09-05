import {Component, HostListener, OnInit} from "@angular/core";
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
    private itemsToSkip = 0;

    constructor(private itemService: ItemService) {
    };

    ngOnInit() {
        this.itemService.getItemsPage(0)
            .subscribe(
                (result) => {
                    this.allItems = this.allItems.concat(result);
                },
                (error) => {
                    console.log("error getting items page");
                }
            );
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

    @HostListener('window:scroll', ['$event']) onScrollEvent($event){
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.itemsToSkip = this.itemsToSkip + 9;
            console.log(this.itemsToSkip);
            //Write logic here for loading new content.

            this.itemService.getItemsPage(this.itemsToSkip)
                .subscribe(
                    (result) => {
                        if(result.length <= 0) {
                            this.itemsToSkip = this.itemsToSkip - 9;
                        } else {
                            this.allItems = this.allItems.concat(result);
                        }
                    },
                    (error) => {
                        console.log("error getting items page");
                    }
                );
        }
    }
}