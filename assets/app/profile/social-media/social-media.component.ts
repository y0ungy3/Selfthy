
import {Component, Input} from "@angular/core";
import {SocialMedia} from "../../models/SocialMedia";
@Component({
    selector: 'app-socialMedia',
    templateUrl: './social-media.component.html',
})
export class SocialMediaComponent {
    @Input() socialMedia: SocialMedia;
}