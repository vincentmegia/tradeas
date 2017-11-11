import { Injectable } from '@angular/core';
import * as Chartist from 'chartist';
import { PortfolioMockData } from './portfolio-mock-data';
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
            series: [ PortfolioMockData.MONTHLYPERFORMANCE ]
        };
        return data;
    }
}