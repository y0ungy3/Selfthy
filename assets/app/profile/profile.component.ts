import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/User";
import {AuthService} from "../services/auth.service";
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
    constructor(private route: ActivatedRoute, private authService: AuthService){};

    private user: User;

    ngOnInit() {
        const username = this.route.snapshot.params['username'];
        this.authService.getUser(username)
            .subscribe(
                (user: User) => this.user = user
            );
    }
}