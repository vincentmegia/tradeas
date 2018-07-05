import {VolumeDetail} from "./volume-detail";

export class Volume {
    id: string;
    symbol: string;
    details: VolumeDetail[];

    public constructor(init?: Partial<Volume>) {
        Object.assign(this, init);
    }

    /**
     *
     */
    get json(): any {
        return {
            _id: this.id,
            symbol: this.symbol
        }
    }
}