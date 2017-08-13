import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {HttpModule} from "@angular/http";
import {routing} from "./app.routing";
import {UploadComponent} from "./upload/upload.component";
import {HomeComponent} from "./home/home.component";
import {HeaderComponent} from "./header/header.component";

@NgModule({
    declarations: [
        AppComponent,
        UploadComponent,
        HomeComponent,
        HeaderComponent
    ],
    imports: [BrowserModule, HttpModule, routing],
    bootstrap: [AppComponent]
})
export class AppModule {

}