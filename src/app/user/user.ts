export class User {
    id: string;
    username: string;
    password: string;
    profile: {
        chart: boolean,
        stock: boolean
    };

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    /**
     *
     */
    get json(): any {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            profile: this.profile
        }
    }
}