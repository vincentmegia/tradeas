import { Component, OnInit } from '@angular/core';
import { Chart } from './chart';
import { PortfolioService } from './portfolio.service';
import { PortfolioChartRenderer } from './portfolio-chart-renderer';
import { TradetisticsRenderer } from './tradetistics-chart-renderer';
import { TradetisticsService } from './tradetistics.service';
import * as Chartist from 'chartist';

declare var $: any;

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
    constructor(private portfolioService: PortfolioService,
        private dailyChartRenderer: PortfolioChartRenderer,
        private weeklyChartRenderer: PortfolioChartRenderer,
        private monthlyChartRenderer: PortfolioChartRenderer,
        private tradetisticsService: TradetisticsService,
        private tradetisticsRenderer: TradetisticsRenderer) {}

    /**
     * 
     */
    ngOnInit() {
        var dailyChart = new Chart();
        dailyChart.data = this.portfolioService.getDailyPerformance();
        this.dailyChartRenderer.drawMonthlyPerformance("#dailyPerformanceChart", dailyChart);

        var weeklyChart = new Chart();
        weeklyChart.data = this.portfolioService.getWeeklyPerformance()
        this.weeklyChartRenderer.drawMonthlyPerformance("#weeklyPerformanceChart", weeklyChart);

        var monthlyChart = new Chart();
        monthlyChart.data = this.portfolioService.getMonthlyPerformance();
        this.monthlyChartRenderer.drawMonthlyPerformance("#monthlyPerformanceChart", monthlyChart);

        var tradetisticsData = new Chart();
        tradetisticsData.data = this.tradetisticsService.getMonthlyPerformance();
        this.tradetisticsRenderer.drawPerformance("#tradetisticsChart", tradetisticsData);

        this.weeklyChartRenderer.drawAnnualPerformance("#annualPerformanceChart", null);
    }
}
                                                        