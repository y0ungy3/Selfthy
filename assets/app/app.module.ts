import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {HttpModule} from "@angular/http";
import {routing} from "./app.routing";
import {UploadComponent} from "./upload/upload.component";
import {HomeComponent} from "./home/home.component";
import {HeaderComponent} from "./header/header.component";
import {ItemService} from "./services/item.service";
import {FormsModule} from "@angular/forms";
import {ItemComponent} from "./item/item.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponentt} from "./auth/registration/registration.component";
import {AuthService} from "./services/auth.service";
import {ErrorComponent} from "./error/error.component";
import {ErrorService} from "./services/error.service";
import {ProfileComponent} from "./profile/profile.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {EditProfileComponent} from "./profile/edit-profile/edit-profile.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {CanDeactivateGuard} from "./services/can-deactivate-guard.service";
import {SocialMediaComponent} from "./profile/social-media/social-media.component";
import {SocialMediaService} from "./services/social-media.service";
import {WebsiteModalComponent} from "./website-modal/website-modal.component";
import {WebsiteModalService} from "./services/website-modal.service";
import {CharacterCount} from "./pipes/characterCount.pipe";

@NgModule({
    declarations: [
        AppComponent,
        UploadComponent,
        HomeComponent,
        HeaderComponent,
        ItemComponent,
        LoginComponent,
        RegistrationComponentt,
        ErrorComponent,
        ProfileComponent,
        PageNotFoundComponent,
        EditProfileComponent,
        SocialMediaComponent,
        WebsiteModalComponent,
        CharacterCount
    ],
    imports: [BrowserModule, HttpModule, routing, FormsModule],
    bootstrap: [AppComponent],
    providers: [ItemService, ErrorService, AuthGuardService, AuthService, CanDeactivateGuard, SocialMediaService, WebsiteModalService]
})
export class AppModule {

}