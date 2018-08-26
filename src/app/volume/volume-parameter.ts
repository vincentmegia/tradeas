import * as moment from 'moment';

export class VolumeParameter {
    symbol: string;
    from: moment.Moment;
    to: moment.Moment;

    public constructor(init?: Partial<VolumeParameter>) {
        Object.assign(this, init);
    }
}
