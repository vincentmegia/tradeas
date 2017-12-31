import { Star } from './star';
import { Position } from './position';
import * as moment from "moment";

export class IdeaJson {
    public _id: string;
    public symbol: string;
    public type: string;
    public chart: string;
    public isSelected: boolean;
    public entryDate: moment.Moment;
    public stars: Star[];
    public position: Position;

    public constructor(init?: Partial<IdeaJson>) {
        Object.assign(this, init);
    }
}