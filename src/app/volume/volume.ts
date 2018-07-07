import {VolumeDetail} from "./volume-detail";

export class Volume {
    id: string;
    symbol: string;
    details: VolumeDetail[];

    public constructor(init?: Partial<Volume>) {
        Object.assign(this, init);
        this.details = new Array<VolumeDetail>();
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