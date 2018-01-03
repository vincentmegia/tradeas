import { Injectable } from '@angular/core';
import * as Chartist from 'chartist';
import { PortfolioMockData } from './portfolio-mock-data';
import { Chart } from './chart';
import { PortfolioService } from 'app/dashboard/portfolio.service';

@Injectable()
export class ChartService {

    /**
     *
     */
    constructor(private portfolioService: PortfolioService) {}
    
    /**
     * 
     */
    getMonthlyPerformance(): any {
        var performance = this.portfolioService
            .getMonthlyPerformance()
            .map(p => p.totalEquity);
        var data = {
            labels: Chart.MONTHS,
            //data here will be replace in the future by a service call
            series: [ performance ]
        };
        console.log("monthly performance ", data);
        return data;
    }

    /**
     * 
     */
    getDailyPerformance(): any {
        var performance = this.portfolioService
            .getDailyPerformance()
            .map(p => p.dayChangeValue);
        var data = {
            labels: Chart.DAYS,
            //data here will be replace in the future by a service call
            series: [ performance ]
        };
        console.log("daily performance ", data);
        return data;
    }

    /**
     * 
     */
    getWeeklyPerformance(): any {
        let performance = this.portfolioService
            .getWeeklyPerformance()
            .map(p => p.totalEquity);
        let data = {
            labels: Chart.WEEKS,
            //data here will be replace in the future by a service call
            series: [ performance ]
        };
        return data;
    }
}