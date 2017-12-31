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
import { IdeaComponent } from './idea/idea.component';
import { Pagination } from './pagination';
import { TransactionService } from './idea/transaction.service';

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
    public startDate: Date;
    public endDate: Date;
    public showProgress: boolean;

    @ViewChild('childModal') 
    public childModal: IdeaComponent;

    constructor(private journalService: JournalService,
                private securityService: SecurityService,
                private transactionService: TransactionService,
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
    hasTransactions(idea: Idea): boolean {
        var hasTransactions = (idea != null && idea.position != null && idea.position.transactions != null)
            ? idea.position.transactions.length > 0
            : false;
        return hasTransactions;
    }

    /**
     * 
     */
    getSelectableClass(idea: Idea): string {
        let selectableClass = this.hasTransactions(idea) 
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
        this.showProgress = true;
        this.getIdeas(moment(this.startDate), moment(this.endDate));
    }

    /**
     * 
     */
    private getIdeas(startDate: moment.Moment, endDate: moment.Moment): void {
        this.journalService
            .getIdeas(startDate, endDate, false)
            .subscribe(ideas => {
                this.ideasStore = ideas;
                this.ideas = ideas;
                this.pagination.totalItems = this.ideas.length;
                this.showProgress = false;
        });
    }

    /**
     * 
     */
    ngOnInit(){
        //new SecurityMockData().generateData();
        //this.journalService.saveIdeas();//refresh data from mock until everything works
        this.startDate = moment().startOf('month').toDate();
        this.endDate = moment().endOf('month').toDate();
        this.dateModel = moment(new Date());
        this.currentMonth = this.dateModel.format('MMMM');
        
        this.showProgress = true;
        this.getIdeas(moment(this.startDate), moment(this.endDate));
        this.securityService
            .getAll()
            .subscribe(securities => this.securities = securities);
        
        //data is of array type and should be later changed to a more model centric appraoch
        this.columns = ['Symbol', 'Type', 'Shares', 'Remaining Shares', 'Average Price', 'Sell', '%Gain/Loss', 'Market Value', 'Chart', 'Entry Date', 'Rating']
        this.subColumns = ['Matched Quantity', 'Price', 'Side', 'Status', 'Created Date'];

        this.childModal.modal.onHidden.subscribe((reason: string) => {
            this.getIdeas(moment(this.startDate), moment(this.endDate));
        });
    }
}