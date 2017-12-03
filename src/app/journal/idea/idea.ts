import { Star } from './star';
import { Position } from './position';
import * as moment from "moment";

export class Idea {
    private _marketValue: number;
    private _gainLoss: number;
    public id: string;
    public symbol: string;
    public type: string;
    public totalShares: number;
    public averageBuyPrice: number;
    public averageSellPrice: number;
    public chart: string;
    public isSelected: boolean;
    public entryDate: moment.Moment;
    public stars: Star[];
    public positions: Position[];

    public constructor(init?: Partial<Idea>) {
        Object.assign(this, init);
    }
    
    /**
     * Computes the market value
     */
    get marketValue(): number {
        let investedAmount = this.averageBuyPrice * this.totalShares;
        this._marketValue = (this._gainLoss * investedAmount) + investedAmount;
        return this._marketValue;
    }

    /**
     * Computes the capital gain loss
     */
    get gainLoss(): number {
        if (this.averageSellPrice == null)
            this._gainLoss = 0;
        else
            this._gainLoss = ((this.averageSellPrice - this.averageBuyPrice) / this.averageBuyPrice);
        return this._gainLoss;
    }

    /**
     * 
     */
    get isGainLoss(): boolean {
        return this.gainLoss >= 0;
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