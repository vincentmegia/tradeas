import { Component, Input } from '@angular/core';
import { IdeaService } from './idea.service';
import { Idea } from './idea';
import { Star } from './star';

@Component({
    selector: 'idea',
    moduleId: module.id,
    templateUrl: 'idea.component.html',
    styleUrls: ['idea.component.css'],
    providers: [ IdeaService ]
})

/**
 * Maybe rethink later, should class start with verb
 */
export class IdeaComponent {
    idea: Idea;
    previousStar: Star;

    constructor(private ideaService: IdeaService) {
        this.idea = new Idea({type: '-----'});
        this.idea.initializeStars();
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
     * @param stars 
     */
    setStars(stars: number): void {
        let selectedStar = this.idea.stars[stars];
        let selected = selectedStar.selected;
        
        if (this.previousStar == null) 
            this.previousStar = selectedStar;
        if (selectedStar.id == this.previousStar.id){
            this.idea.toggleStars(stars, !selected);
        }
        else if (this.idea.isAllStarsEmpty || this.previousStar.id < selectedStar.id) {
            this.idea.toggleStars(stars, true);    
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
    save(): void {
        console.log('saving idea...', this.idea)
        this.ideaService.addIdea(this.idea);
    }
}