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
    transactionIds: any;
    transactionsStore: Transaction[];
    totalShares: number;
    averageBuyPrice: number;
    averageSellPrice: number;

    public constructor(init?: Partial<Position>) {
        Object.assign(this, init); 
    }

    /**
     * Computes the market value
     */
    get marketValue(): number {
        let investedAmount = this.computedAverageBuyPrice * this.computedTotalShares;
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
    get computedTotalShares(): number {
        if (!this.transactionsStore) return 0;
        let buyTransactions = this.transactionsStore
            .filter(t => t.side.toLowerCase() === "buy")
            .map(t => t.matchedQuantity);
        
        if (buyTransactions.length === 0) return 0;
        let totalShares = buyTransactions.reduce((a, b)=> a + b);
        return totalShares;
    }

    /**
     * 
     */
    get remainingShares(): number {
        if (!this.transactionsStore) return 0;
        let sellTransactions  = this.transactionsStore
            .filter(t => t.side.toLowerCase() === "sell")
            .map(t => t.matchedQuantity);
        
        if (sellTransactions.length === 0) return 0;
        let remainingShares = sellTransactions.reduce((a, b)=> a + b);
        remainingShares = Math.abs(this.computedTotalShares - remainingShares);
        return remainingShares;
    }

    /**
     * Computes the capital gain loss
     */
    get gainLoss(): number {
        if (!this.averageSellPrice)
            this._gainLoss = 0;
        else
            this._gainLoss = ((this.averageSellPrice - this.computedAverageBuyPrice) / this.computedAverageBuyPrice);
        return this._gainLoss;
    }

    /**
     * 
     */
    get computedAverageBuyPrice(): number {
        if (!this.transactionsStore) return 0;
        let buyTransasctions = this.transactionsStore
            .filter(t => t.side.toLowerCase() === "buy")
            .map(t => t.price);
            
        if (buyTransasctions.length === 0) return 0;
        let averageBuyPrice = buyTransasctions.reduce((a, b)=> a + b);
        averageBuyPrice = averageBuyPrice / buyTransasctions.length;
        return averageBuyPrice;
    }

    /**
     * 
     */
    get computedAverageSellPrice(): number {
        if (!this.transactionsStore) return 0;
        let sellTransactions = this.transactionsStore
            .filter(t => t.side.toLowerCase() === "sell")
            .map(t => t.price);

        if (sellTransactions.length === 0) return 0;
        let averageBuyPrice = sellTransactions.reduce((a, b)=> a + b);
        averageBuyPrice = averageBuyPrice / sellTransactions.length;
        return averageBuyPrice;
    }
}