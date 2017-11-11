import * as moment from "moment";

export class Idea {
    private _marketValue: number;
    private _gainLoss: number;
    public symbol: string;
    public type: string;
    public shares: number;
    public averagePrice: number;
    public sell: number;
    public chart: string;
    public entryDate: moment.Moment;
    public stars: any[];

    public constructor(init?: Partial<Idea>) {
        Object.assign(this, init);
    }

    /**
     * Computes the market value
     */
    get marketValue(): number {
        let investedAmount = this.averagePrice * this.shares;
        this._marketValue = (this._gainLoss * investedAmount) + investedAmount;
        return this._marketValue;
    }

    /**
     * Computes the capital gain loss
     */
    get gainLoss(): number {
        this._gainLoss = ((this.sell - this.averagePrice) / this.averagePrice);
        return this._gainLoss;
    }
}