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
        this.noResult = false;
        this.itemService.findItems(this.searchValue)
            .subscribe(
                (items: Item[]) => {
                    if (items.length == 0)
                        this.noResult = true;
                    else
                        this.allItems = items;

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
            this.itemService.getItemsPage(0)
                .subscribe(
                    (items: Item[]) => {
                        this.allItems = [];
                        this.itemsToSkip = 0;
                        this.allItems = this.allItems.concat(items);
                    });
        }
    }

    @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.itemsToSkip = this.itemsToSkip + 10;

            this.itemService.getItemsPage(this.itemsToSkip)
                .subscribe(
                    (items: Item[]) => {
                        if (items.length <= 0) {
                            this.itemsToSkip = this.itemsToSkip - 10;
                        } else {
                            this.allItems = this.allItems.concat(items);
                        }
                    },
                    (error) => {
                        console.log("error getting items page");
                    }
                );
        }
    }

    parseTags(array: []) {
        let formattedTags = '';
        let newTag = '';
        for(let tag of array) {
            newTag = "#" + tag + " ";
            formattedTags = formattedTags + newTag;
        }
        return formattedTags;
    }

    viewPicture(item: Item) {
        this.itemService.callModal(item);
    }
}