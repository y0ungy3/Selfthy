import {Component, OnInit} from "@angular/core";
import {ItemService} from "../services/item.service";
import {Item} from "../models/Item";
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{

    constructor(private itemService: ItemService, private authService: AuthService, private router: Router) {};

    private img: any;


    ngOnInit() {
        if(!this.authService.isLoggedIn()) {
           this.router.navigateByUrl('/login');
        }
    }


    onPost(form: NgForm) {
       const item = {picture: this.img, description: form.value.description};
        this.itemService.addItem(item).subscribe(
            data => console.log(data),
            error => console.log(error)
        );
        form.resetForm();
    }

    readImage(event) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event:any) => {
                this.img = event.target.result;
            };
        }
    }
}