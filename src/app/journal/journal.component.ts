import { Component, OnInit, Input } from '@angular/core';
import { JournalService } from './journal.service';
import { IdeaService } from './idea/idea.service';
import { Idea } from './idea/idea';
import { Observable } from 'rxjs/rx';
import * as moment from "moment";

@Component({
    selector: 'journal',
    moduleId: module.id,
    templateUrl: 'journal.component.html',
    styleUrls: ['journal.component.css'],
    providers: [ JournalService ]
})

export class JournalComponent implements OnInit{
    public columns: string[];
    public subColumns: string[];
    public dateModel: moment.Moment; 
    public currentMonth: string;
    public stars: number[];
    public ideas: Idea[];

    constructor(private journalService: JournalService) {}

    /**
     * 
     * @param idea 
     */
    onRowClick(idea: Idea): void {
        idea.isSelected = !idea.isSelected;
    }

    /**
     * 
     * @param idea 
     */
    getExpandedClass(idea: Idea): string {
        let expandedClass = (idea.isSelected) 
        ? 'fa fa-plus' 
        : 'fa fa-minus';
        return expandedClass;
    }

    /**
     * 
     * @param idea 
     */
    hasPositions(idea: Idea): boolean {
        return idea.positions.length > 0;
    }

    /**
     * 
     */
    getSelectableClass(idea: Idea): string {
        let selectableClass = this.hasPositions(idea) 
        ? 'selectable' 
        : '';
        return selectableClass;
    }

    /**
     * 
     */
    ngOnInit(){
        this.journalService
            .getIdeas(null, null)
            .subscribe(ideas => this.ideas = ideas);
        this.dateModel = moment(new Date());
        this.currentMonth = this.dateModel.format('MMMM');
        console.log(this.ideas);

        //data is of array type and should be later changed to a more model centric appraoch
        this.columns = ['Symbol', 'Type', 'Shares', 'Average Price', 'Sell', '%Gain/Loss', 'Market Value', 'Chart', 'Entry Date', 'Rating']
        this.subColumns = ['Shares', 'Buy Price', 'Sell Price', 'Entry Date'];
    }
}