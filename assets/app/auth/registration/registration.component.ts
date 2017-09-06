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

    private showBadAlert = false;
    constructor(private authService: AuthService, private router: Router) {
    };

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/home');
        }
    }

    onRegister(form: NgForm) {
        this.showBadAlert = false;
        if (form.value.password == form.value.retypePassword) {
            const user = new User(
                form.value.username,
                form.value.password
            );
            this.authService.register(user)
                .subscribe(
                    data => {
                        this.router.navigateByUrl('/login')
                    },
                    (error) => {
                        this.showBadAlert = true;
                    }
                );
        }
    }

    checkPassword(form: NgForm) {
        return form.value.password == form.value.retypePassword;
    }

}