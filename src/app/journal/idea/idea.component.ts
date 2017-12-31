import { Component, Input, ViewChild } from '@angular/core';
import { IdeaService } from './idea.service';
import { JournalService } from '../journal.service'
import { Idea } from './idea';
import { Star } from './star';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SecurityService } from '../../shared/services/security.service';
import { Security } from '../../shared/services/security';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationComponent } from '../../shared/validation/validation.component';
import * as moment from "moment";

@Component({
    selector: 'idea',
    moduleId: module.id,
    templateUrl: 'idea.component.html',
    styleUrls: ['idea.component.css'],
    providers: [ IdeaService, JournalService ]
})

/**
 * Maybe rethink later, should class start with verb
 */
export class IdeaComponent {
    public idea: Idea;
    public previousStar: Star;
    public securities: Security[];
    public userForm: any;
    
    @ViewChild('childModal') 
    public modal: ModalDirective;
    
    constructor(private ideaService: IdeaService,
                private journalService: JournalService,
                private securityService: SecurityService,
                private formBuilder: FormBuilder) {
        this.idea = new Idea({type: '-----'});
        this.initializeStars(this.idea);
        
        this.securityService
        .getAll()
        .subscribe(securities => this.securities = securities);

        this.userForm = this.formBuilder.group({
            'symbol': ['', Validators.required],
            'totalShares': ['', Validators.required],
            'averageBuyPrice': [''],
            'averageSellPrice': [''],
            'chart': ['']
        });
    }

    /**
     * 
     * @param tradeType 
     */
    setTradeType(tradeType: string): void {
        this.idea.type = tradeType;
        console.log(this.idea);
    }

    /**
     * 
     */
    show(): void {
        this.modal.show();
    }
     
     /**
      * 
      */
    hide(): void {
        this.modal.hide();
    }

    /**
     * 
     * @param stars 
     */
    setStars(stars: number): void {
        let selectedStar = this.idea.stars[stars];
        let selected = selectedStar.selected;
        
        if (this.previousStar == null) 
            this.previousStar = selectedStar;
        if (selectedStar.id == this.previousStar.id){
            this.toggleStars(this.idea, stars, !selected);
        }
        else if (this.isAllStarsEmpty(this.idea) || this.previousStar.id < selectedStar.id) {
            this.toggleStars(this.idea,stars, true);    
        }
        else {
            for (let index = selectedStar.id + 1; index <= 2; index++) {
                this.idea.stars[index].selected = false;
            }
        }
        this.previousStar = this.idea.stars[stars]; 
        console.log(this.idea);
    }

        /**
     * 
     */
    initializeStars(idea: Idea): void {
        idea.stars = [new Star({id: 0}), new Star({id: 1}), new Star({id: 2})];
    }


    /**
     * 
     */
    isAllStarsEmpty(idea: Idea): boolean {
        let isAllStarsEmpty = true;
        for (let star of idea.stars) {
            if (star.selected) {
                isAllStarsEmpty = false;
            }
        }
        return isAllStarsEmpty;
    }

    /**
     * 
     * @param stars 
     * @param selected 
     */
    toggleStars(idea: Idea, stars: number, selected: boolean): void {
        for (let index = 0; index <= stars; index++){
            idea.stars[index].selected = selected;
        }
    }

    /**
     * 
     */
    save(): void {
        if (this.userForm.dirty && this.userForm.valid) {
            alert(`Name: ${this.userForm.value.name}`);
        }

        this.idea.entryDate = moment(new Date());
        this.idea.id = this.idea.symbol + this.idea.entryDate.format('MMMMDDYYYYhhmmss');
        console.log('saving idea...', this.idea);
        this.ideaService.addIdea(this.idea);
        this.hide();
    }
}