import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/User";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router){};

    ngOnInit() {
        if(this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/home');
        }
    }

    onLogin(form: NgForm) {
        const user = new User(form.value.username, form.value.password);
        this.authService.login(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('username', data.username);
                    this.router.navigateByUrl('/home');
                },
                error => console.log(error)
            )
    }

    registerClicked() {
        this.router.navigateByUrl('/registration');
    }
}