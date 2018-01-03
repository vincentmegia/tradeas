export class Portfolio {
    totalEquity: number;
    broker: string;

    public constructor(init?: Partial<Portfolio>) {
        Object.assign(this, init);
    }
}