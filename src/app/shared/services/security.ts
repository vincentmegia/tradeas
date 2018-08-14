interface ISecurity {
    id: string;
    name: string;
    symbol: string;
    closePrice: number;
    openPrice: number;
    previousClosePrice: number;
}
export class Security implements ISecurity {
    private _id: string;
    public name: string;
    public symbol: string;
    public sector: string;
    public subSector: string;
    public closePrice: number;
    public openPrice: number;
    public previousClosePrice: number;

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