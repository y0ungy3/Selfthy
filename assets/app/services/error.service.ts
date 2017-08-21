import {EventEmitter} from "@angular/core";

import {Error} from "../models/Error";

export class ErrorService {
    errorOccurred = new EventEmitter<Error>();

    handleError(err: any) {
        const error = new Error(err.title, err.error.message);
        this.errorOccurred.emit(error);
    }
}