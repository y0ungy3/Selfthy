import {Component, OnInit} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private authService: AuthService, private router:Router){};

    username: String = '';

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    logout() {
        this.authService.logout();
    }

    goToProfile() {
        if(this.isLoggedIn()) {
            this.username = this.authService.getUsername();
            this.router.navigateByUrl('/' + this.username);
        }
    }
}