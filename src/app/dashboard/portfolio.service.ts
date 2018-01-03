import { Injectable } from '@angular/core';
import * as Chartist from 'chartist';
import { PortfolioMockData } from './portfolio-mock-data';
import { Chart } from './chart';
import { Portfolio } from 'app/dashboard/portfolio';
import { PortfolioSnapshot } from 'app/dashboard/portfolio-snapshot';

@Injectable()
export class PortfolioService {

    /**
     * 
     */
    getPortfolio(): Portfolio {
        var portfolio = PortfolioMockData.PORTFOLIO;
        return portfolio;
    }

    /**
     * 
     */
    getMonthlyPerformance(): PortfolioSnapshot[] {
        var performance = PortfolioMockData.MONTHLYPERFORMANCE;
        console.log("monthly performance ", performance);
        return performance;
    }

    /**
     * 
     */
    getDailyPerformance(): PortfolioSnapshot[] {
        var performance = PortfolioMockData.PORTFOLIODAILY;
        console.log("daily performance ", performance);
        return performance;
    }

    /**
     * 
     */
    getWeeklyPerformance(): PortfolioSnapshot[] {
        var performance = PortfolioMockData.PORTFOLIOWEEKLY;
        console.log("weekly performance ", performance);
        return performance;
    }
}