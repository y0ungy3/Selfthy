import {Component} from "@angular/core";
import {User} from "../../models/User";
import {Item} from "../../models/Item";
import {ItemService} from "../../services/item.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {CanDeactivateInterface} from "../../services/can-deactivate-guard.service";
import {Observable} from "rxjs";
import {WebsiteModalService} from "../../services/website-modal.service";
import {SocialMedia} from "../../models/SocialMedia";
import {SocialMediaService} from "../../services/social-media.service";

@Component({
    selector: 'app-editProfile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements CanDeactivateInterface {

    private allItems: Item[] = [];
    private allSocialMedias: SocialMedia[] = [];
    private user: User;

    constructor(private itemService: ItemService, private authService: AuthService,
                private route: ActivatedRoute, private router: Router,
                private websiteModalService: WebsiteModalService, private socialMediaService: SocialMediaService) {
    };

    onSave(description: String) {
        this.user.description = description;
        this.authService.updateUser(this.user)
            .subscribe(
                (user: User) => {
                    this.router.navigateByUrl('/' + this.user.username)
                }
            );
    }

    ngOnInit() {
        // get the user's information
        const username = this.route.snapshot.params['username'];
        this.authService.getUser(username)
            .subscribe(
                (user: User) => {
                    this.user = user;
                    // if this person is not the actual user then dont let him edit
                    if (!this.belongsToUser(user)) {
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
                        this.getUserSocialMedias(user.userId);
                    }
                }
            );
        let self = this;
        this.socialMediaService.socialUpdated.subscribe(
            (social: SocialMedia) => {
                this.allSocialMedias.push(social);
            }
        );

    }

    deletePost(item: Item) {
        this.itemService.deleteItem(item)
            .subscribe((result) => {
                    this.allItems.splice(this.allItems.indexOf(item), 1)
                },
                (error) => {
                    console.log("Can't Delete")
                }
            )
        ;
    }

    onDeleteSocial(social: SocialMedia) {
        this.socialMediaService.deleteSocialMedia(social)
            .subscribe(
                (social: SocialMedia) => {
                    this.allSocialMedias.splice(this.allSocialMedias.indexOf(social), 1)
                }
            );
    }

    belongsToUser(user: User) {
        return localStorage.getItem('userId') == user.userId;
    }

    onAddWebsite() {
        const social = new SocialMedia();
        this.websiteModalService.callModal(social);
    }

    getUserSocialMedias(userId: String) {
        this.socialMediaService.getSocialMedias(userId)
            .subscribe(
                (socialMedias: SocialMedia) => {
                    this.allSocialMedias = socialMedias;
                },
                (error) => {
                    console.log("Error getting social medias for a user")
                }
            );
    }

}