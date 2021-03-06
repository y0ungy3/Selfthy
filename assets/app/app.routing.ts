import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {UploadComponent} from "./upload/upload.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponentt} from "./auth/registration/registration.component";
import {ProfileComponent} from "./profile/profile.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {EditProfileComponent} from "./profile/edit-profile/edit-profile.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {DeleteAccountComponent} from "./delete-account/delete-account.component";
import {AboutComponent} from "./footer-links/about/about.component";
import {UserAgreementComponent} from "./footer-links/user-agreement/user-agreement.component";
import {ContactComponent} from "./footer-links/contact/contact.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'upload', canActivate: [AuthGuardService], component: UploadComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponentt},
    {path: 'about', component: AboutComponent},
    {path: 'user-agreement', component: UserAgreementComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'not-found', component: PageNotFoundComponent},
    {path: 'delete-account', canActivate: [AuthGuardService], component: DeleteAccountComponent},
    {path: 'edit/:username', camActivate: [AuthGuardService], component: EditProfileComponent},
    {path: ':username', component: ProfileComponent},
    {path: '**', redirectTo: '/not-found'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);