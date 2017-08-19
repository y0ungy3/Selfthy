import {SocialMedia} from "./SocialMedia";
import {Item} from "./Item";
export class User {
    constructor(
        public username?: String,
        public email: String,
        public password: String,
        public description?: String,
        public picture?: any,
        public links?: SocialMedia[],
        public userId?: String,
        public items?: Item[],
        public views?: String
    ){};
}