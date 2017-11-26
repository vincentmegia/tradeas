import { Component, OnInit, Input } from '@angular/core';
import { JournalService } from './journal.service';
import { Idea } from './idea/idea';
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
    public dateModel: moment.Moment; 
    public currentMonth: string;
    public stars: number[];
    public ideas: Idea[];

    constructor(private journalService: JournalService) {}

    /**
     * 
     */
    ngOnInit(){
        this.ideas = this.journalService.getIdeas(null, null);
        this.dateModel = moment(new Date());
        this.currentMonth = this.dateModel.format('MMMM');
        console.log(this.ideas);

        //data is of array type and should be later changed to a more model centric appraoch
        this.columns = ['Symbol', 'Type', 'Shares', 'Average Price', 'Sell', '%Gain/Loss', 'Market Value', 'Chart', 'Entry Date', 'Rating']
    }
}