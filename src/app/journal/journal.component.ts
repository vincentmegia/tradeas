import { Component, OnInit } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'journal',
    moduleId: module.id,
    templateUrl: 'journal.component.html',
    styleUrls: ['journal.component.css']
})
export class JournalComponent implements OnInit{
    public tableData1: TableData;
    public tableData2: TableData;
    ngOnInit(){
        this.tableData1 = {
            headerRow: [ 'Symbol', 'Type', 'Invested', 'Actual', 'Buy', 'Sell', 'Gain/Loss', 'Chart', 'Create Date', 'Rating'],
            dataRows: [
                ['2GO', 'TF', '100,000', '200,000', '12.5', '28.5', '+120%', 'https://storage.investagrams.com/files/Chart/tv/2017/07/16/20170716-093124-gThWEagL.jpg', 'April-20-2017', '***'],
                ['MAC', 'TF', '100,000', '150,000', '5', '9', '+69.7%', 'https://storage.investagrams.com/files/Chart/tv/2017/07/16/20170716-094405-EmwJ8Bqn.jpg', 'July-16-2017', '***'],
            ]
        };
    }
}