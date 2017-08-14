import {SocialMedia} from "./SocialMedia";
import {Item} from "./Item";
export class User {
    constructor(
        //TODO: user image profile
        public username: String,
        public description: String,
        public links?: SocialMedia[],
        public userId?: String,
        public items?: Item[]
    ){};
}