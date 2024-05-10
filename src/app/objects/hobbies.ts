export class Hobbies {
    type!: string;
    amount!: number;
    brand!: string;
    color!: string;
    comment!: string;
    price!: number;
    orderDate!: Date;
    id!: number;
    constructor(init?: Partial<Hobbies>) {
        Object.assign(this, init);
    }
}