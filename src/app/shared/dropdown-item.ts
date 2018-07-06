export class DropdownItem {
    key: string;
    value: string;

    public constructor(init?: Partial<DropdownItem>) {
        Object.assign(this, init);
    }
}