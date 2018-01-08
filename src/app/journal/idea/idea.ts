import { Star } from './star';
import { Position } from './position';
import * as moment from "moment";

export class Idea {
    id: string;
    revision: string;
    symbol: string;
    type: string;
    chart: string;
    isSelected: boolean;
    entryDate: moment.Moment;
    status: string;
    stars: Star[];
    position: Position;

    public constructor(init?: Partial<Idea>) {
        Object.assign(this, init);
    }

    /**
     * 
     */
    get json(): any {
        return {
            _id: this.id,
            symbol: this.symbol,
            type: this.type,
            chart: this.chart,
            isSelected: this.isSelected,
            entryDate: this.entryDate,
            stars: (this.stars == null) ? [] : this.stars,
            position: this.position 
        }
    }
}