import { Star } from './star';
import { Position } from './position';
import * as moment from "moment";
import { IdeaJson } from './idea.json';

export class Idea {
    private _marketValue: number;
    private _gainLoss: number;
    private _averageBuyPrice: number;
    private _totalShares: number;

    public id: string;
    public symbol: string;
    public type: string;
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
        this._marketValue = (this.gainLoss * investedAmount) + investedAmount;
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
    get averageBuyPrice(): number {
        if (this.positions.length == 0) return this._averageBuyPrice;

        let averageBuyPrice = 0;
        for (let position of this.positions) {
            averageBuyPrice += position.buyPrice;
        }
        averageBuyPrice = averageBuyPrice / this.positions.length;
        return averageBuyPrice;
    }

    /**
     * 
     */
    set averageBuyPrice(averageBuyPrice: number) {
        this._averageBuyPrice = averageBuyPrice;
    }

    /**
     * 
     */
    get totalShares(): number {
        if (this.positions.length == 0) return this._totalShares;

        let totalShares = 0;
        for (let position of this.positions) {
            totalShares += position.shares;
        }
        return totalShares;
    }

    /**
     * 
     */
    set totalShares(totalShares: number) {
        this._totalShares = totalShares;
    }

    /**
     * 
     */
    get json(): IdeaJson {
        return {
            _id: this.id,
            symbol: this.symbol,
            type: this.type,
            totalShares: this.totalShares,
            averageBuyPrice: this.averageBuyPrice,
            averageSellPrice: this.averageSellPrice,
            chart: this.chart,
            isSelected: this.isSelected,
            entryDate: this.entryDate,
            stars: (this.stars == null) ? [] : this.stars,
            positions: (this.positions == null) ? [] : this.positions
        }
    }
}