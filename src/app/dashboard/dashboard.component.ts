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
    providers: [
        PortfolioService,
        PortfolioChartRenderer,
        TradetisticsService,
        TradetisticsRenderer
    ]
})

export class DashboardComponent implements OnInit {
    constructor(private portfolioService: PortfolioService,
        private portfolioChartRenderer: PortfolioChartRenderer,
        private tradetisticsService: TradetisticsService,
        private tradetisticsRenderer: TradetisticsRenderer) {}

    /**
     * 
     */
    ngOnInit() {
        var portfolioPerformanceData = new Chart();
        portfolioPerformanceData.data = this.portfolioService.getMonthlyPerformance();
        this.portfolioChartRenderer.drawMonthlyPerformance("#portfolioPerformanceChart", portfolioPerformanceData);

        var tradetisticsData = new Chart();
        tradetisticsData.data = this.tradetisticsService.getMonthlyPerformance();
        this.tradetisticsRenderer.drawPerformance("#tradetisticsChart", tradetisticsData);

        this.portfolioChartRenderer.drawAnnualPerformance("#annualPerformanceChart", null);
    }
}
