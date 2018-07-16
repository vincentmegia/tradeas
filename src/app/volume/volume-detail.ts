import { Side } from "./side";

export class VolumeDetail {
    id: string;
    brokerCode: string;
    brokerName: string;
    buyer: Side;
    seller: Side;
    netAmount: number;
    totalValue: number;
    totalPercentage: number;
    
    
    public constructor(init?: Partial<VolumeDetail>) {
        Object.assign(this, init);
    }

    /**
     *
     */
    get json(): any {
        return {
            _id: this.id,
            brokerCode: this.brokerCode,
            brokerName: this.brokerName,
            buyer: this.buyer,
            seller: this.seller,
            netAmount: this.netAmount,
            totalValue: this.totalValue
        }
    }
}