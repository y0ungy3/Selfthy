export class Item {
    constructor(
        public picture: any,
        public description: String,
        public createdAt: Date,
        public itemID?: String,
        public userId?: String) {
    };
}