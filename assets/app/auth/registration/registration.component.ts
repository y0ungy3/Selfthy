import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";
import {User} from "../../models/User";
import {Router} from "@angular/router";
@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponentt implements OnInit {

    constructor(private authService: AuthService, private router: Router) {
    };

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/home');
        }
    }

    onRegister(form: NgForm) {
        if (form.value.password == form.value.retypePassword) {
            const user = new User(
                form.value.username,
                form.value.email,
                form.value.password
            );
            this.authService.register(user)
                .subscribe(
                    data => {
                        this.router.navigateByUrl('/login')
                    },
                    error => console.log(error)
                );
        }
    }

    checkPassword(form: NgForm) {
        return form.value.password == form.value.retypePassword;
    }

}