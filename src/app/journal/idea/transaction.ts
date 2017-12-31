import * as moment from 'moment';

export class Transaction {
    public id: string;
    public rev: string;
    public symbol: string;
    public quantity: number;
    public matchedQuantity: number;
    public price: number;
    public side: string;
    public status: string;
    public createdDate: moment.Moment;

    public constructor(init?: Partial<Transaction>) {
        Object.assign(this, init);
    }
}