interface IBroker {
    id: string;
    name: string;
}

export class Broker implements IBroker {
    private _id: string;
    public name: string;

    public constructor(init?: Partial<Broker>) {
        Object.assign(this, init);
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }
}