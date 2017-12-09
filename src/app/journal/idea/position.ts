import * as moment from "moment";

export class Position {
    public shares: number;
    public buyPrice: number;
    public sellPrice: number;
    public entryDate: moment.Moment

    public constructor(init?: Partial<Position>) {
        Object.assign(this, init);
    }
}