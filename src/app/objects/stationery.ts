export class Stationery {
    type!: string;
    amount!: number;
    brand!: string;
    color!: string;
    comment!: string;
    price!: number;
    orderDate!: Date;
    id!: number;
    constructor(init?: Partial<Stationery>) {
        Object.assign(this, init);
    }
}