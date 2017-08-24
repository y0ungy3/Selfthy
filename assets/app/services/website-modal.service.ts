import {EventEmitter} from "@angular/core";
import {SocialMedia} from "../models/SocialMedia";


export class WebsiteModalService {
    socialMedia = new EventEmitter<SocialMedia>();

    callModal(social: SocialMedia) {
        this.socialMedia.emit(social);
    }

}