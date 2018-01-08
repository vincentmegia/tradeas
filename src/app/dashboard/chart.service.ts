import { Injectable } from '@angular/core';
import * as Chartist from 'chartist';
import { PortfolioMockData } from './portfolio-mock-data';
import { Chart } from './chart';
import { PortfolioService } from 'app/dashboard/portfolio.service';
import * as moment from 'moment';

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
        let performance = this.portfolioService
            .getMonthlyPerformance()
            .map(p => p.totalEquity);
        let data = {
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
    getPerformanceByRange(startDate: moment.Moment, endDate: moment.Moment): any {
        let performance = this.portfolioService
            .getPerformanceByRange(startDate, endDate)
            .map(p => p.dayChangeValue);
        let data = {
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