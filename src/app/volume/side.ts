export class Side {
    volume: number;
    average: number;
    amount: number;

    public constructor(init?: Partial<Side>) {
        Object.assign(this, init);
    }

    /**
     *
     */
    get json(): any {
        return {
            volume: this.volume,
            average: this.average,
            amount: this.amount
        }
    }
}