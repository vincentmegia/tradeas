import { Component, OnInit, Input } from '@angular/core';
import { JournalService } from './journal.service';
import { Idea } from './idea';
import * as moment from "moment";

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'journal',
    moduleId: module.id,
    templateUrl: 'journal.component.html',
    styleUrls: ['journal.component.css'],
    providers: [ JournalService ]
})
export class JournalComponent implements OnInit{
    public tableData1: TableData;
    public tableData2: TableData;
    public dateModel: moment.Moment; 
    public currentMonth: string;
    public stars: number[];
    public ideas: Idea[];

    constructor(private journalService: JournalService) {}

    ngOnInit(){
        this.ideas = this.journalService.getIdeas(null, null);
        this.dateModel = moment(new Date());
        this.currentMonth = this.dateModel.format('MMMM');
        this.stars = Array(5).fill(0).map((x,i)=>i);

        //data is of array type and should be later changed to a more model centric appraoch
        this.tableData1 = {
            headerRow: [ 'Symbol', 'Type', 'Shares', 'Average Price', 'Sell', '%Gain/Loss', 'Market Value', 'Chart', 'Entry Date', 'Rating'],
            dataRows: [
                ['2GO', 'TF', '100,000', '20', '28.5', '120', '100,000', 'https://storage.investagrams.com/files/Chart/tv/2017/07/16/20170716-093124-gThWEagL.jpg', 'April-20-2017', '3'],
                ['MAC', 'TF', '100,000', '6', '9', '69.7', '100,000', 'https://storage.investagrams.com/files/Chart/tv/2017/07/16/20170716-094405-EmwJ8Bqn.jpg', 'July-16-2017', '3'],
                ['PXP', 'ABO', '4400', '9.10', '8.46', '-8', '100,000', 'https://storage.investagrams.com/files/Chart/tv/2017/11/11/20171111-152441-4iqNjOKc.jpg', 'Nov-11-2017', '1'],
                ['GSMI', 'ABO', '2400', '28.8', '9', '-6', '100,000', 'https://storage.investagrams.com/files/Chart/tv/2017/11/11/20171111-153535-qFtiU8s1.jpg', 'Nov-11-2017', '1']
            ]
        };
    }
}