import {Component} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
@Component({
    selector: 'app-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

    constructor(private authService: AuthService, private router: Router) {
    };

    deleteAccount() {
        this.authService.deleteAccount()
            .subscribe(
                (result) => {
                    localStorage.clear();
                    this.router.navigateByUrl('/home');
                },
                (error) => {
                    console.log("Error delete user")
                }
            )
    }
}