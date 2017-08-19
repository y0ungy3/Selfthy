import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {UploadComponent} from "./upload/upload.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponentt} from "./auth/registration/registration.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'upload', component: UploadComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponentt}
];

export const routing = RouterModule.forRoot(APP_ROUTES);