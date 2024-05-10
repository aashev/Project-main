export class Books {
    genre!: string;
    amount!: number;
    name!: string;
    author!: string;
    year!: number;
    publishingHouse!: string;
    price!: number;
    comment!: string;
    orderDate!: Date;
    id!: number;
    constructor(init?: Partial<Books>) {
        Object.assign(this, init);
    }
}