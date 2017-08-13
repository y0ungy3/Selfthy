import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {UploadComponent} from "./upload/upload.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'upload', component: UploadComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);