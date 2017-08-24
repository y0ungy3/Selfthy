import {Component} from "@angular/core";
import {User} from "../../models/User";
import {Item} from "../../models/Item";
import {ItemService} from "../../services/item.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-editProfile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

    private defaultPic = require('../../../images/default-pic.jpg');
    private allItems: Item[] = [];
    private user: User;

    constructor(private itemService: ItemService, private authService: AuthService, private route: ActivatedRoute, private router: Router){};

    onSave(form: NgForm) {
        const editedUser = new User(

        );
        this.authService.updateUser(editedUser)
            .subscribe(
                this.router.navigateByUrl('/' + this.user.username)
            );
    }

    onCancel() {
        this.router.navigateByUrl('/' + this.user.username);
    }

    ngOnInit() {
        // get the user's information
        const username = this.route.snapshot.params['username'];
        this.authService.getUser(username)
            .subscribe(
                (user: User) => {
                    this.user = user;
                    if(!this.belongsToUser(user)) {
                        this.router.navigateByUrl('/home');
                    }
                    else {
                        // get all posts for this particular user
                        this.itemService.getItems(user.userId)
                            .subscribe(
                                (items: Item) => {
                                    this.allItems = items;
                                }
                            );
                    }
                }
            );
    }

    deletePost(item: Item) {
        this.itemService.deleteItem(item)
            .subscribe(
                this.allItems.splice(this.allItems.indexOf(item), 1)
            );
    }

    belongsToUser(user: User) {
        return localStorage.getItem('userId') == user.userId;
    }
}