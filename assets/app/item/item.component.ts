import {Component, Input} from "@angular/core";
import {Item} from "../models/Item";
@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent {
    @Input() anItem: Item;
}