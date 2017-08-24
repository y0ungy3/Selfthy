import {Component, EventEmitter, OnInit} from "@angular/core";
import {SocialMedia} from "../models/SocialMedia";
import {WebsiteModalService} from "../services/website-modal.service";
import {NgForm} from "@angular/forms";
import {SocialMediaService} from "../services/social-media.service";

@Component({
    selector: 'app-website-modal',
    templateUrl: './website-modal.component.html',
    styleUrls: ['./website-modal.component.css']
})
export class WebsiteModalComponent implements OnInit{
    private social: SocialMedia;
    private displayed = 'none';

    constructor(private websiteModalService: WebsiteModalService, private socialMediaService: SocialMediaService){};

    ngOnInit() {
        this.websiteModalService.socialMedia
            .subscribe(
                (social: SocialMedia) => {
                    this.social = social;
                    this.displayed = 'block';
                }
            )
    }

    onSave(form: NgForm) {
        const newSocial = new SocialMedia(
            form.value.link,
            form.value.title,
            form.value.description
        );
        this.socialMediaService.addSocialMedia(newSocial).subscribe(
            this.socialMediaService.socialUpdated.emit(newSocial)
        );
        this.displayed = 'none';
    }

    onClose() {
        this.displayed = 'none';
    }
}