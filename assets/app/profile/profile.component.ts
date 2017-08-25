import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../models/User";
import {AuthService} from "../services/auth.service";
import {Item} from "../models/Item";
import {ItemService} from "../services/item.service";
import {SocialMedia} from "../models/SocialMedia";
import {SocialMediaService} from "../services/social-media.service";
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    constructor(private route: ActivatedRoute, private authService: AuthService, private itemService: ItemService,
                private router: Router, private socialService: SocialMediaService) {
    };

    private defaultPic = require('../../images/default-pic.jpg');
    private user: User;
    private allItems: Item[] = [];
    private allSocialMedias: SocialMedia[] = [];
    private isUser: boolean = false;
    private views: String;

    ngOnInit() {
        // get the user's information
        let username = this.route.snapshot.params['username'];
        this.route.params.subscribe(
            (params: Params) => {
                username = params['username'];
                this.getUser(username);
            }
        );
    }

    getUserSocialMedias(userId: String) {
        this.socialService.getSocialMedias(userId)
            .subscribe(
                (socialMedias: SocialMedia) => {
                    this.allSocialMedias = socialMedias;
                },
                (error) => {
                    console.log("Error getting social medias for a user")
                }
            );
    }

    onEdit() {
        this.router.navigateByUrl("/edit/" + this.user.username);
    }

    belongsToUser(user: User) {
        return localStorage.getItem('userId') == user.userId;
    }

    getUser(username: String) {
        this.authService.getUser(username)
            .subscribe(
                (user: User) => {
                    this.user = user;

                    // check if the person viewing this profile is the actual user or someone else
                    this.isUser = this.belongsToUser(user);

                    // if not the logged in user, then increment the number of views
                    if (!this.isUser) {
                        this.authService.updateView(user).subscribe(
                            (user: User) => {
                                this.views = user.views;
                            }
                        );
                    }

                    // get all posts for this particular user
                    this.itemService.getItems(user.userId)
                        .subscribe(
                            (items: Item) => {
                                this.allItems = items;
                            },
                            (error) => {
                                console.log(error)
                            }
                        );

                    this.getUserSocialMedias(user.userId);
                },
                (error) => {
                    this.router.navigateByUrl('/not-found');
                }
            );
    }
}