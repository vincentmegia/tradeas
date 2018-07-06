export class TableColumn {
    key: string;
    value: string;
    sortFlagToggle: boolean;

    public constructor(init?: Partial<TableColumn>) {
        Object.assign(this, init);
        this.sortFlagToggle = false;
    }
}