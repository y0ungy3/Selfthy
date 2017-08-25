
import {Component, Input} from "@angular/core";
import {SocialMedia} from "../../models/SocialMedia";
@Component({
    selector: 'app-socialMedia',
    templateUrl: './social-media.component.html',
})
export class SocialMediaComponent {
    @Input() socialMedia: SocialMedia;

    openUrl() {
        let url: string = '';
        // test if the link has http in it or not
        if (!/^http[s]?:\/\//.test(this.socialMedia.link)) {
            url += 'http://';
        }

        // if it doesnt then add http to it
        url = url + this.socialMedia.link;
        window.open(url, '_blank');
    }
}