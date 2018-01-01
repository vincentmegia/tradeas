export class Portfolio {
    public totalEquity: number;
    public balance: number;
    public buyingPower: number;
    public broker: string;

    public constructor(init?: Partial<Portfolio>) {
        Object.assign(this, init);
    }
}