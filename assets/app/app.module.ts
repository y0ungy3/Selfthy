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

@NgModule({
    declarations: [
        AppComponent,
        UploadComponent,
        HomeComponent,
        HeaderComponent,
        ItemComponent,
        LoginComponent,
        RegistrationComponentt
    ],
    imports: [BrowserModule, HttpModule, routing, FormsModule],
    bootstrap: [AppComponent],
    providers: [ItemService]
})
export class AppModule {

}