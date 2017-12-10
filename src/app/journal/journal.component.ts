import { Component, OnInit, Input } from '@angular/core';
import { JournalService } from './journal.service';
import { IdeaService } from './idea/idea.service';
import { Idea } from './idea/idea';
import { Observable } from 'rxjs/rx';
import { SecurityService } from '../shared/services/security.service'
import { Security } from '../shared/services/security';
import * as moment from "moment";
import { SecurityMockData } from 'app/shared/services/security-mock-data';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead'

@Component({
    selector: 'journal',
    moduleId: module.id,
    templateUrl: 'journal.component.html',
    styleUrls: ['journal.component.css'],
    providers: [ JournalService, SecurityService ]
})

export class JournalComponent implements OnInit{
    public columns: string[];
    public subColumns: string[];
    public dateModel: moment.Moment; 
    public currentMonth: string;
    public stars: number[];
    public ideas: Idea[];
    public ideasStore: Idea[];
    public selected: string;
    public securities: Security[];

    constructor(private journalService: JournalService,
                private securityService: SecurityService) {}

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
     * @param e 
     */
    onInput(e: string): void {
        if (e === '') this.ideas = this.ideasStore;
        else this.ideas = this.ideasStore.filter(idea => idea.symbol.toLowerCase().includes(e.toLowerCase()));
        console.log(e);
    }

    totalItems: number = 64;
    currentPage: number = 4;
    smallnumPages: number = 0;
   
    pageChanged(event: any): void {
      console.log('Page changed to: ' + event.page);
      console.log('Number items per page: ' + event.itemsPerPage);
    }
    
    /**
     * 
     */
    ngOnInit(){
        //new SecurityMockData().generateData();
        this.journalService.saveIdeas();//refresh data from mock until everything works
        this.journalService
            .getIdeas(null, null)
            .subscribe(ideas => {this.ideasStore = ideas; this.ideas = ideas});
        this.dateModel = moment(new Date());
        this.currentMonth = this.dateModel.format('MMMM');
        this.securityService
            .getAll()
            .subscribe(securities => this.securities = securities);
        //data is of array type and should be later changed to a more model centric appraoch
        this.columns = ['Symbol', 'Type', 'Shares', 'Average Price', 'Sell', '%Gain/Loss', 'Market Value', 'Chart', 'Entry Date', 'Rating']
        this.subColumns = ['Shares', 'Buy Price', 'Sell Price', 'Entry Date'];
    }
}