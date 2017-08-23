import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {UploadComponent} from "./upload/upload.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponentt} from "./auth/registration/registration.component";
import {ProfileComponent} from "./profile/profile.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {EditProfileComponent} from "./profile/edit-profile/edit-profile.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'upload', component: UploadComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponentt},
    {path: 'edit/:username', component: EditProfileComponent},
    {path: ':username', component: ProfileComponent},
    {path: 'not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/not-found'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);