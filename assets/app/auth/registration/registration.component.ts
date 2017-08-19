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
export class RegistrationComponentt {

    constructor(private authService: AuthService, private router: Router) {
    };

    onRegister(form: NgForm) {
        const user = new User(
            form.value.username,
            form.value.email,
            form.value.password
        );
        this.authService.register(user)
            .subscribe(
                data => console.log(data),
                error => console.log(error),
                this.router.navigateByUrl('/login')
            );
        form.reset();
    }

    checkPassword(form: NgForm) {
        //returns TRUE if they match
        return form.value.password == form.value.retypePassword;
    }

}