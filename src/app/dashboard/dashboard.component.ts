import { Component, OnInit } from '@angular/core';
import { Chart } from './chart';
import { PortfolioService } from './portfolio.service';
import { PortfolioChartRenderer } from './portfolio-chart-renderer';
import { TradetisticsRenderer } from './tradetistics-chart-renderer';
import { TradetisticsService } from './tradetistics.service';
import * as Chartist from 'chartist';
import * as moment from "moment";
import { PortfolioSnapshot } from 'app/dashboard/portfolio-snapshot';
import { ChartService } from 'app/dashboard/chart.service';
import { Portfolio } from 'app/dashboard/portfolio';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    providers: [
        PortfolioService,
        PortfolioChartRenderer,
        TradetisticsService,
        TradetisticsRenderer
    ]
})

export class DashboardComponent implements OnInit {
    nowPerformance: PortfolioSnapshot;
    portfolio: Portfolio;
    monday: moment.Moment;
    friday: moment.Moment;
    today: moment.Moment;
    totalProfitLossPercentage: number;
    isDailyCollapsed: boolean;
    isWeeklyCollapsed: boolean;
    isMonthlyCollapsed: boolean;

    constructor(private portfolioService: PortfolioService,
        private chartService: ChartService,
        private dailyChartRenderer: PortfolioChartRenderer,
        private weeklyChartRenderer: PortfolioChartRenderer,
        private monthlyChartRenderer: PortfolioChartRenderer,
        private tradetisticsService: TradetisticsService,
        private tradetisticsRenderer: TradetisticsRenderer) {}

    /**
     * 
     */
    get totalProfitLoss(): number {
        return this.nowPerformance.totalEquity - this.portfolio.totalEquity;
    }

    /**
     * 
     */
    ngOnInit(): void {
        this.today = moment(new Date());
        this.portfolio = this.portfolioService.getPortfolio();
        let dailyData = this.portfolioService.getDailyPerformance();
        
        let weekDay = moment().weekday();
        if (weekDay === 6) this.today = this.today.subtract(1, 'days');
        if (weekDay === 0) this.today = this.today.subtract(2, 'days');
        this.nowPerformance = dailyData.find(d => {
            return d.createdDate.isSame(this.today, 'days');
        });

        this.totalProfitLossPercentage = (this.nowPerformance.totalEquity - this.portfolio.totalEquity ) / this.portfolio.totalEquity;
        this.monday = moment().startOf('isoweek' as moment.unitOfTime.StartOf);
        this.friday = moment().startOf('isoweek' as moment.unitOfTime.StartOf).add(4, 'days');
        let dailyChart = new Chart();
        dailyChart.data = this.chartService.getPerformanceByRange(this.monday, this.friday);
        debugger;
        dailyChart.high = 10000;
        dailyChart.low = -10000;
        this.dailyChartRenderer.draw("#dailyPerformanceChart", dailyChart);

        let weeklyChart = new Chart();
        weeklyChart.data = this.chartService.getWeeklyPerformance()
        weeklyChart.high = 1500000;
        weeklyChart.low = -1500000;
        this.weeklyChartRenderer.draw("#weeklyPerformanceChart", weeklyChart);

        let monthlyChart = new Chart();
        monthlyChart.high = 100000;
        monthlyChart.low = 10000;
        monthlyChart.data = this.chartService.getMonthlyPerformance();
        this.monthlyChartRenderer.draw("#monthlyPerformanceChart", monthlyChart);

        let tradetisticsData = new Chart();
        tradetisticsData.data = this.tradetisticsService.getMonthlyPerformance();
        this.tradetisticsRenderer.drawPerformance("#tradetisticsChart", tradetisticsData);

        this.weeklyChartRenderer.drawAnnualPerformance("#annualPerformanceChart", null);
    }
}
                                                        