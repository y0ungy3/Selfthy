import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
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
    constructor(private route: ActivatedRoute, private authService: AuthService, private itemService: ItemService,
    private router: Router) {};

    private user: User;
    private allItems: Item[] = [];
    private isUser: boolean = false;

    ngOnInit() {
        // get the user's information
        const username = this.route.snapshot.params['username'];
        this.authService.getUser(username)
            .subscribe(
                (user: User) => {
                    this.user = user;
                    this.isUser = this.belongsToUser(user);
                    // get all posts for this particular user
                    this.itemService.getItems(user.userId)
                        .subscribe(
                            (items: Item) => {
                                this.allItems = items;
                            }
                        );
                }
            );
    }

    onEdit() {
        this.router.navigateByUrl("/edit/" + this.user.username);
    }

    belongsToUser(user: User) {
        return localStorage.getItem('userId') == user.userId;
    }
}