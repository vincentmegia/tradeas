import {Component, OnInit} from '@angular/core';
import * as moment from "moment";
import {Pagination} from '../journal/pagination';
import {Volume} from './volume';
import {Side} from './side';

@Component({
    selector: 'volume-cmp',
    moduleId: module.id,
    templateUrl: 'volume.component.html',
    styleUrls: ['volume.component.css'],
})

export class VolumeComponent implements OnInit {
    public columns: string[];
    public pagination: Pagination;
    public volumes: Volume[];

    /**
     *
     */
    ngOnInit(){
        //data is of array type and should be later changed to a more model centric appraoch
        this.columns = ['Net Buyers', 'Buy Vol', 'Buy Value', 'Buy Ave', 'Sell Vol', 'Sell Amt', 'Sell Ave', 'Net Amount', 'Total Value']
        this.volumes = [
            new Volume({
            name: 'COL FINANCIAL',
            buyer: new Side({
                volume: 7804400,
                amount: 77156050,
                average: 9.8862}),
            seller: new Side({
                volume: 7804400,
                amount: 64308756,
                average: 9.8862}),
            netAmount: 12847294,
            totalValue: 141464806
        }),
        new Volume({
            name: 'TIMSON SECURITIES',
            buyer: new Side({
                volume: 1168200,
                amount: 11564277,
                average: 9.8992}),
            seller: new Side({
                volume: 1638000,
                amount: 16271480,
                average: 9.9337}),
            netAmount: -4707203,
            totalValue: 27835757
        })
        ];
    }
}
