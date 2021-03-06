import {Component} from "@angular/core";
import {ItemService} from "../services/item.service";
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent {

    constructor(private itemService: ItemService, private authService: AuthService, private router: Router) {};

    private img: any;
    private showAlert: boolean = false;
    private showBadAlert = false;
    public characterLeft: String = '';
    private tags = [];

    onPost(form: NgForm) {
        if(this.authService.isLoggedIn()) {
            let formatedTags = [];
            for(let i=0; i < this.tags.length; i++) {
                formatedTags.push(this.tags[i].value.toLowerCase());
            }
            const item = {picture: this.img, description: form.value.description, tags: formatedTags};
            this.itemService.addItem(item).subscribe(
                data => {
                    this.img = null;
                    this.showAlert = true;
                    this.characterLeft = '';
                    form.resetForm();
                    this.tags = [];
                },
                error => {
                    this.showBadAlert = true;
                }
            );
        } else {
            this.router.navigateByUrl('/login');
        }
    }

    readImage(event) {
        this.showAlert = false;
        this.showBadAlert = false;
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event:any) => {
                this.img = event.target.result;
            };
        }
    }

}