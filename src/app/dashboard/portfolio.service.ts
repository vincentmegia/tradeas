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
        var performance = PortfolioMockData.MONTHLYPERFORMANCE.map(p => p.totalEquity);
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
        var performance = PortfolioMockData.PORTFOLIODAILY.map(p => p.totalEquity);
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
        var performance = PortfolioMockData.PORTFOLIOWEEKLY.map(p => p.totalEquity);
        var data = {
            labels: Chart.WEEKS,
            //data here will be replace in the future by a service call
            series: [ performance ]
        };
        return data;
    }
}