import { Star } from './star';
import * as moment from "moment";

export class Idea {
    private _marketValue: number;
    private _gainLoss: number;
    public id: number;
    public symbol: string;
    public type: string;
    public shares: number;
    public averagePrice: number;
    public sell: number;
    public chart: string;
    public entryDate: moment.Moment;
    public stars: Star[];

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

    /**
     * 
     */
    initializeStars(): void {
        this.stars = [new Star({id: 0}), new Star({id: 1}), new Star({id: 2})];
    }


    /**
     * 
     */
    get isAllStarsEmpty(): boolean {
        let isAllStarsEmpty = true;
        for (let star of this.stars) {
            if (star.selected) {
                isAllStarsEmpty = false;
            }
        }
        return isAllStarsEmpty;
    }

    /**
     * 
     * @param stars 
     * @param selected 
     */
    toggleStars(stars: number, selected: boolean): void {
        for (let index = 0; index <= stars; index++){
            this.stars[index].selected = selected;
        }
    }
}