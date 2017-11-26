export class Star {
    public id: number;
    public class: string;
    private _selected: boolean;

    public constructor(init?: Partial<Star>) {
        Object.assign(this, init);
        this.class = 'glyphicon glyphicon-star-empty';
        this._selected = false;
    }

    /**
     * 
     */
    get selected(): boolean {
        return this._selected;
    }
    
    /**
     * 
     */
    set selected(selected: boolean) {
        this._selected = selected;
        this.class = (selected) 
            ? 'glyphicon glyphicon-star'
            : 'glyphicon glyphicon-star-empty';
    }   
}