import {Portfolio} from './portfolio';
import * as moment from "moment";

export class PortfolioSnapshot extends Portfolio {
    balance: number;
    buyingPower: number;
    createdDate: moment.Moment;
    gainLossValue: number;
    gainLossPercentage: number;
    dayChangeValue: number;
    dayChangePercentage: number;

    constructor(init?: Partial<PortfolioSnapshot>) {
        super(init);
        Object.assign(this, init);
    }
}