import {Component} from "@angular/core";
import {ItemService} from "../services/item.service";
import {Item} from "../models/Item";
import {NgForm} from "@angular/forms";
@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html'
})
export class UploadComponent {

    constructor(private itemService: ItemService) {
    };

    onPost(form: NgForm) {
        console.log(form.value.description);
       /* const item = new Item(form.value.description);
        this.itemService.addItem(item).subscribe(
            data => console.log(data),
            error => console.log(error)
        );*/
        form.resetForm();
    }
}