import { Volume } from './volume';
import { VolumeDetail } from "./volume-detail";
import { Broker } from "../shared/services/broker";

export class VolumeDetailBuilder {
    details: VolumeDetail[];
    brokers: Broker[];

    public constructor(init?: Partial<VolumeDetailBuilder>) {
        Object.assign(this, init);
    }


    /**
     *
     * @returns {Volume}
     */
    build(): VolumeDetail[] {
        let list = [];
        let totalValue = 0;
        this.details.map(detail => {
            totalValue += detail.totalValue;
            let broker = this.brokers.find(broker => broker.id === detail.brokerCode);
            detail.brokerName = broker.name;

            if (!list[detail.brokerCode]) {//use id for now
                list[detail.brokerCode] = detail;
                return detail;
            }

            list[detail.brokerCode].buyer.average += detail.buyer.average;
            list[detail.brokerCode].buyer.amount += detail.buyer.amount;
            list[detail.brokerCode].buyer.volume += detail.buyer.volume;
            list[detail.brokerCode].seller.average += detail.seller.average;
            list[detail.brokerCode].seller.amount += detail.seller.amount;
            list[detail.brokerCode].seller.volume += detail.seller.volume;
            list[detail.brokerCode].netAmount += detail.netAmount;
            list[detail.brokerCode].totalValue += detail.totalValue;

            return detail;
        });

        //convert hasmap to array
        let details = []; 
        list.map(hashMap => {
            //compute for vol percentage
            hashMap.totalPercentage = (hashMap.totalValue / totalValue) * 100;
            hashMap.buyer.average = (hashMap.buyer.amount === 0) ? 0 : hashMap.buyer.amount / hashMap.buyer.volume;
            hashMap.seller.average = (hashMap.seller.amount === 0) ? 0 : hashMap.seller.amount / hashMap.seller.volume;
            details.push(hashMap);
        });
        
        details.sort((vol1, vol2): number => {
            if (vol1.totalValue > vol2.totalValue) return -1;
            if (vol1.totalValue < vol2.totalValue) return 1;
            return 0;
        });
        
        return details;
    }
}