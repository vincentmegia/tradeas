import * as moment from "moment";
import { Side } from "./side";

export class Volume {
    id: string;
    name: string;
    buyer: Side;
    seller: Side;
    netAmount: number;
    totalValue: Number;

    public constructor(init?: Partial<Volume>) {
        Object.assign(this, init);
    }

    /**
     *
     */
    get json(): any {
        return {
            _id: this.id,
            name: this.name,
            buyer: this.buyer,
            seller: this.seller,
            netAmount: this.netAmount,
            totalValue: this.totalValue
        }
    }
}