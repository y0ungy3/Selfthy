export class Item {
    constructor(
        public picture: any,
        public description: String,
        public createdAt: Date,
        public itemID?: String,
        public username?: String,
        public tags?: String[]) {
    };
}