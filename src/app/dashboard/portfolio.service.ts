import { Injectable } from '@angular/core';
import { PortfolioMockData } from './portfolio-mock-data';
import { Portfolio } from 'app/dashboard/portfolio';
import { PortfolioSnapshot } from 'app/dashboard/portfolio-snapshot';
import * as moment from 'moment';

@Injectable()
export class PortfolioService {

    /**
     * 
     */
    getPortfolio(): Portfolio {
        let portfolio = PortfolioMockData.PORTFOLIO;
        return portfolio;
    }

    /**
     * 
     */
    getMonthlyPerformance(): PortfolioSnapshot[] {
        let performance = PortfolioMockData.MONTHLYPERFORMANCE;
        console.log("monthly performance ", performance);
        return performance;
    }

    /**
     * 
     */
    getDailyPerformance(): PortfolioSnapshot[] {
        let dailySnapshots = PortfolioMockData.PORTFOLIODAILY;
        return dailySnapshots;
    }

    /**
     * 
     */
    getHistoryByRange(monday: moment.Moment, friday: moment.Moment): PortfolioSnapshot[] {
        let dailySnapshots = PortfolioMockData.PORTFOLIODAILY;
        let performance = dailySnapshots.filter(item => item.createdDate.isBetween(monday, friday, null, '[]'));
        console.log("daily performance ", performance);
        return performance;
    }

    /**
     * 
     */
    getHistoryByWeeks(): PortfolioSnapshot[] {
        let performance = PortfolioMockData.PORTFOLIOWEEKLY;
        console.log("weekly performance ", performance);
        return performance;
    }
}