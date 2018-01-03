import * as moment from 'moment';
import { Transaction } from './transaction';

export class Position {
    private _marketValue: number;
    private _gainLoss: number;

    orderId: string;
    transactionId: string;
    status: string;
    symbol: string;
    entryDate: moment.Moment
    createdDate: moment.Moment;
    transactions: Transaction[];
    transactionsList: string[];
    transactionsStore: Transaction[];

    public constructor(init?: Partial<Position>) {
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
     * 
     */    
    get isGainLoss(): boolean {
        return this.gainLoss >= 0;
    }

    /**
     * 
     */
    get totalShares(): number {
        if (!this.transactionsStore) return 0;
        let totalShares = this.transactionsStore
            .filter(t => t.side.toLowerCase() == "buy")
            .map(t => t.matchedQuantity)
            .reduce((a, b)=> a + b);
        return totalShares;
    }

    /**
     * 
     */
    get remainingShares(): number {
        if (!this.transactionsStore) return 0;
        let remainingShares = this.transactionsStore
            .filter(t => t.side.toLowerCase() == "sell")
            .map(t => t.matchedQuantity)
            .reduce((a, b)=> a + b);
        remainingShares = Math.abs(this.totalShares - remainingShares);
        return remainingShares;
    }

    /**
     * Computes the capital gain loss
     */
    get gainLoss(): number {
        if (!this.averageSellPrice)
            this._gainLoss = 0;
        else
            this._gainLoss = ((this.averageSellPrice - this.averageBuyPrice) / this.averageBuyPrice);
        return this._gainLoss;
    }

    /**
     * 
     */
    get averageBuyPrice(): number {
        if (!this.transactionsStore) return 0;
        let buyTransasctions = this.transactionsStore
            .filter(t => t.side.toLowerCase() == "buy")
            .map(t => t.price);
        let averageBuyPrice = buyTransasctions.reduce((a, b)=> a + b);
        averageBuyPrice = averageBuyPrice / buyTransasctions.length;
        return averageBuyPrice;
    }

    /**
     * 
     */
    get averageSellPrice(): number {
        if (!this.transactionsStore) return 0;
        let sellTransactions = this.transactionsStore
            .filter(t => t.side.toLowerCase() == "sell")
            .map(t => t.price);
        let averageBuyPrice = sellTransactions.reduce((a, b)=> a + b);
        averageBuyPrice = averageBuyPrice / sellTransactions.length;
        return averageBuyPrice;
    }
}