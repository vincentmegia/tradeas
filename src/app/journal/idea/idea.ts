import { Star } from './star';
import { Position } from './position';
import * as moment from "moment";
import { IdeaJson } from './idea.json';

export class Idea {
    public id: string;
    public revision: string;
    public symbol: string;
    public type: string;
    public chart: string;
    public isSelected: boolean;
    public entryDate: moment.Moment;
    public stars: Star[];
    public position: Position;

    public constructor(init?: Partial<Idea>) {
        Object.assign(this, init);
    }

    /**
     * 
     */
    get json(): IdeaJson {
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