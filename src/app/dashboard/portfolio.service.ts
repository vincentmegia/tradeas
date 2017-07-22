import { Injectable } from '@angular/core';
import * as Chartist from 'chartist';
import { MockData } from './mock-data';
import { Chart } from './chart';

@Injectable()
export class PortfolioService {

    /**
     * 
     */
    getMonthlyPerformance(): any {
        var data = {
            labels: Chart.MONTHS,
            //data here will be replace in the future by a service call
            series: [ MockData.MONTHLYPERFORMANCE ]
        };
        return data;
    }

    // getYearlyPerformance(): any {
    //     var data = {
    //         labels:
    //     }
    // }
}
