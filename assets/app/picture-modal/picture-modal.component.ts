import {Component, OnInit} from "@angular/core";
import {ItemService} from "../services/item.service";
import {Item} from "../models/Item";
@Component({
    selector: 'app-picture-modal',
    templateUrl: './picture-modal.component.html',
    styleUrls: ['./picture-modal.component.css']
})
export class PictureModalComponent implements OnInit {
    private displayed = 'none';
    private picture;

    constructor(private itemService: ItemService) {
    };

    ngOnInit() {
        this.itemService.pictureModal
            .subscribe(
                (item: Item) => {
                    this.picture = item.picture;
                    this.displayed = 'block';
                }
            )
    }

    onClose() {
        this.displayed = 'none';
    }
}