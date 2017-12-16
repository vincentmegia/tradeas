import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { JournalService } from './journal.service';
import { IdeaService } from './idea/idea.service';
import { Idea } from './idea/idea';
import { Observable } from 'rxjs/rx';
import { SecurityService } from '../shared/services/security.service'
import { Security } from '../shared/services/security';
import * as moment from "moment";
import { SecurityMockData } from 'app/shared/services/security-mock-data';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead'
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { IdeaComponent } from './idea/idea.component';
import { Pagination } from './pagination'

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
    public pagination: Pagination;
    public startDate: Date = new Date();
    public endDate: Date = new Date();
    public modalRef: BsModalRef;

    @ViewChild('childModal') 
    public childModal: IdeaComponent;

    constructor(private journalService: JournalService,
                private securityService: SecurityService,
                private viewContainerRef: ViewContainerRef) {

        this.pagination = new Pagination({itemsPerPage: 10, currentPage: 1})
    }

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
        console.log("idea.id " + idea.id + ", has positions " + idea.positions.length);
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


   
    pageChanged(event: any): void {
      console.log('Page changed to: ' + event.page);
      console.log('Number items per page: ' + event.itemsPerPage);
    }

    /**
     * 
     */
    onSearch(): void {
        this.journalService
        .getIdeas(moment(this.startDate), moment(this.endDate))
        .subscribe(ideas => {
            this.ideasStore = ideas;
            this.ideas = ideas;
            this.pagination.totalItems = this.ideas.length;
        });
    }

    /**
     * 
     */
    ngOnInit(){
        //new SecurityMockData().generateData();
        //this.journalService.saveIdeas();//refresh data from mock until everything works
        let monthStart = moment().startOf('month');
        let monthEnd = moment().endOf('month');
        this.dateModel = moment(new Date());
        this.currentMonth = this.dateModel.format('MMMM');

        this.journalService
            .getIdeas(monthStart, monthEnd)
            .subscribe(ideas => {
                this.ideasStore = ideas;
                this.ideas = ideas;
                this.pagination.totalItems = this.ideas.length;
            });
        
        this.securityService
            .getAll()
            .subscribe(securities => this.securities = securities);
        
        //data is of array type and should be later changed to a more model centric appraoch
        this.columns = ['Symbol', 'Type', 'Shares', 'Average Price', 'Sell', '%Gain/Loss', 'Market Value', 'Chart', 'Entry Date', 'Rating']
        this.subColumns = ['Shares', 'Buy Price', 'Sell Price', 'Entry Date'];
    }
}