import {Broker} from "./broker";

interface ISecurity {
    id: string;
    name: string;
    symbol: string;
    closePrice: number;
    openPrice: number;
    previousClosePrice: number;
    brokerIds: string[];
    brokers: Broker[];
    notes: string;
}

export class Security implements ISecurity {
    private _id: string;
    name: string;
    symbol: string;
    sector: string;
    subSector: string;
    closePrice: number;
    openPrice: number;
    previousClosePrice: number;
    brokerIds: string[];
    brokers: Broker[];
    notes: string;

    public constructor(init?: Partial<Security>) {
        Object.assign(this, init);
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }
}