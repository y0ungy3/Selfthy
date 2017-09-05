import {Component, OnInit} from "@angular/core";
import {Error} from '../models/Error';
import {ErrorService} from "../services/error.service";
import {Router} from "@angular/router";
@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit{
    error: Error;
    displayed = 'none';

    constructor(private errorService: ErrorService, private router: Router){};

    ngOnInit() {
        this.errorService.errorOccurred
            .subscribe(
                (error: Error) => {
                    this.error = error;
                    if(error.title == 'Not Authenticated') {
                        localStorage.clear();
                        this.router.navigateByUrl('/login');
                    }
                    this.displayed = 'block';
                }
            )
    }

    onErrorHandled() {
        this.displayed = 'none';
    }
}