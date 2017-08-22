import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/User";
import {AuthService} from "../services/auth.service";
import {Item} from "../models/Item";
import {ItemService} from "../services/item.service";
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    constructor(private route: ActivatedRoute, private authService: AuthService, private itemService: ItemService) {
    };

    user: User;
    allItems: Item[] = [];

    ngOnInit() {
        // get the user's information
        const username = this.route.snapshot.params['username'];
        this.authService.getUser(username)
            .subscribe(
                (user: User) => {
                    this.user = user;
                    console.log(user);
                    this.itemService.getItems(user.userId)
                        .subscribe(
                            (items: Item) => {
                                this.allItems = items;
                            }
                        );
                }
            );




    }
}