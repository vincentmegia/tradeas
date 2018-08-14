export class Pagination {
    public totalItems: number;
    public currentPage: number;
    public smallnumPages: number;
    public itemsPerPage: number;

    public constructor(init?: Partial<Pagination>) {
        Object.assign(this, init);
    }
}