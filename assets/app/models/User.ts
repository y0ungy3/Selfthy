import {SocialMedia} from "./SocialMedia";
import {Item} from "./Item";
export class User {
    constructor(
        public username: String,
        public password: String,
        public description?: String,
        public views?: Number,
        public userId?: String
    ){};
}