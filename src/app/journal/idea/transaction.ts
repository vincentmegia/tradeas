import * as moment from 'moment';

export class Transaction {
    id: string;
    rev: string;
    transactionId: string;
    orderId: string;
    symbol: string;
    quantity: number;
    matchedQuantity: number;
    price: number;
    side: string;
    status: string;
    createdDate: moment.Moment;

    public constructor(init?: Partial<Transaction>) {
        Object.assign(this, init);
    }

    get json(): any {
        return {
            _id: this.id,
            symbol: this.symbol,
            quantity: this.quantity,
            matchedQuantity: this.matchedQuantity,
            price: this.price,
            side: this.side,
            status: this.status,
            createdDate: this.createdDate
        }
    }
}