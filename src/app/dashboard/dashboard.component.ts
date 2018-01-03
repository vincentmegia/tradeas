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
    ngOnInit() {
        this.portfolio = this.portfolioService.getPortfolio();
        let dailyData = this.portfolioService.getDailyPerformance();
        this.nowPerformance = dailyData.find(d => d.createdDate.isSame(new Date(), 'day'));
        
        let dailyChart = new Chart();
        dailyChart.data = this.chartService.getDailyPerformance();
        dailyChart.high = 10000;
        dailyChart.low = -10000;
        this.dailyChartRenderer.draw("#dailyPerformanceChart", dailyChart);

        let weeklyChart = new Chart();
        weeklyChart.high = 50000;
        weeklyChart.low = 5000;
        weeklyChart.data = this.chartService.getWeeklyPerformance()
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
                                                        