import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { Pagination } from '../journal/pagination';
import { Volume } from './volume';
import { SecurityService } from '../shared/services/security.service'
import { Security } from "../shared/services/security";
import { VolumeService } from "./volume.service";
import { VolumeDetail } from "./volume-detail";
import { VolumeChartRenderer } from "./volume-chart-renderer";
import { Chart } from "../dashboard/chart";
import { DropdownItem } from "../shared/dropdown-item";
import { TableColumn } from "../shared/table-column";
import { CompareService } from "../shared/services/compare.service";
import { Broker } from "../shared/services/broker";
import { BrokerService } from "../shared/services/broker.service";
import { VolumeDetailBuilder } from "./volume-detail-builder";
import {LoadingBarService} from "@ngx-loading-bar/core";

@Component({
    selector: 'volume-cmp',
    moduleId: module.id,
    templateUrl: 'volume.component.html',
    styleUrls: ['volume.component.css'],
    providers: [VolumeChartRenderer, CompareService]
})
export class VolumeComponent implements OnInit {
    columns: TableColumn[];
    pagination: Pagination;
    volume: Volume;
    detailsCache: VolumeDetail[];
    securities: Security[];
    startDate: Date;
    endDate: Date;
    selectedSymbol: string;
    chartDropdownItems: DropdownItem[];
    chartSelectedItem: DropdownItem;
    chartTypeDropdownItems: DropdownItem[];
    chartTypeSelectedItem: DropdownItem;
    isChartCollapse: boolean;
    isBuyerSellerCollapsed: boolean;
    brokers: Broker[];  
    minDate: Date;
    maxDate: Date;

    constructor(private securityService: SecurityService,
                private volumeService: VolumeService,
                private volumeChartRenderer: VolumeChartRenderer,
                private compareService: CompareService,
                private brokerService: BrokerService,
                private loadingBar: LoadingBarService) {
        this.pagination = new Pagination({itemsPerPage: 10, currentPage: 1});
        this.chartDropdownItems = [
            new DropdownItem({key: 'totalValue', value: 'Total value'}),
            new DropdownItem({key: 'netAmount', value: 'Net Amount'}),
            new DropdownItem({key: 'buyVolume', value: 'Buy volume'}),
            new DropdownItem({key: 'sellVolume', value: 'Sell volume'}),
        ];
        this.chartSelectedItem = this.chartDropdownItems[0];
        this.chartTypeDropdownItems = [
            new DropdownItem({key: 'horizontalBar', value: 'Horizontal Bar'}),
            new DropdownItem({key: 'stackedBar', value: 'Stacked Bar'}),
            new DropdownItem({key: 'pie', value: 'Pie'})
        ];
        this.chartTypeSelectedItem = this.chartTypeDropdownItems[0];
        this.volume = new Volume();
        this.isChartCollapse = true;
        this.isBuyerSellerCollapsed = true;
        this.detailsCache = [];
        this.minDate = new Date(2018, 5, 29);
        this.maxDate = new Date();
    }

    /**
     *
     */
    onSearch(): void {
        this.loadingBar.start();
        this.volumeService
            .getVolumes(this.selectedSymbol, moment(this.startDate), moment(this.endDate))
            .subscribe(volumes => {
                if (volumes.length === 0) {
                    this.volume.details = [];
                    this.detailsCache = [];
                    this.pagination.totalItems = 0;
                    this.loadingBar.stop();
                    return;
                }
                let mergedDetails = [];
                volumes.map(v => {
                    v.details.map(d => mergedDetails.push(d));
                });
    
                let volumeDetailBuilder = new VolumeDetailBuilder({details: mergedDetails, brokers: this.brokers});
                let details = volumeDetailBuilder.build();

                this.pagination.totalItems = details.length;
                this.detailsCache = details.slice(0);
                volumes[0].details = this.detailsCache.slice(0, this.pagination.itemsPerPage);
                this.volume = volumes[0];
                console.log(this.volume);

                //set chart
                let labels = this.detailsCache.map(d => d.brokerName);
                let series = this.detailsCache.map(d => d.totalValue);
                let chart = new Chart();
                chart.data = {
                    labels: labels,
                    series: [series]
                };
                this.volumeChartRenderer.chart = chart;
                this.volumeChartRenderer.draw(this.chartTypeSelectedItem.key,"#volumeChart");
                this.isChartCollapse = false;
                this.isBuyerSellerCollapsed = false;
                this.loadingBar.stop();
            });
    }

    /**
     * 
     * @returns {boolean}
     */
    isChartVisible(): string {
        return (this.volume.details.length > 0) ? "block" : "none";
    }
    
    /**
     * 
     * @param event
     */
    pageChanged(event: any): void {
        let start = event.page * event.itemsPerPage;
        let end = start + event.itemsPerPage;
        this.volume.details = this.detailsCache.slice(start, end);
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    }
    
    /**
     *
     * @param {string} column
     */
    onChartColumnClick(column: string): void {
        let chart = new Chart();
        let labels = [];
        let series = [];
        if (column === "totalValue") {
            this.chartSelectedItem = this.chartDropdownItems[0];
            labels = this.detailsCache.map(d => d.brokerName);
            series = this.detailsCache.map(d => d.totalValue);
        } else if (column === "netAmount") {
            this.chartSelectedItem = this.chartDropdownItems[1];
            labels = this.detailsCache.map(d => d.brokerName);
            series = this.detailsCache.map(d => d.netAmount);
        } else if (column === "buyer.volume") {
            this.chartSelectedItem = this.chartDropdownItems[2];
            labels = this.detailsCache.map(d => d.brokerName);
            series = this.detailsCache.map(d => d.buyer.volume);
        } else if (column === "seller.volume") {
            this.chartSelectedItem = this.chartDropdownItems[3];
            labels = this.detailsCache.map(d => d.brokerName);
            series = this.detailsCache.map(d => d.seller.volume);
        } else if (column === "totalPercentage") {
            this.chartSelectedItem = this.chartDropdownItems[3];
            labels = this.detailsCache.map(d => d.brokerName);
            series = this.detailsCache.map(d => d.totalPercentage);
        }
        chart.data = {
            labels: labels,
            series: [series]
        };
        this.volumeChartRenderer.chart = chart;
        this.volumeChartRenderer.draw(this.chartTypeSelectedItem.key,"#volumeChart");
    }

    /**
     * 
     * @param {string} type
     */
    onChartTypeClick(type: string) {
        if (type === "horizontalBar")
            this.chartTypeSelectedItem = this.chartTypeDropdownItems[0];
        else if (type === "stackedBar")
            this.chartTypeSelectedItem = this.chartTypeDropdownItems[1];
        else if (type === "pie")
            this.chartTypeSelectedItem = this.chartTypeDropdownItems[2];
        
        this.volumeChartRenderer.draw(this.chartTypeSelectedItem.key,"#volumeChart");
    }
    

    /**
     *
     * @param {TableColumn} column
     */
    onSort(column: TableColumn) {
        console.log("sorting column:" + column);
        this.compareService.sort(
            this.detailsCache,
            column.key, 
            column.sortFlagToggle ? "asc" : "desc")
            .map(item => item.totalValue);
        column.sortFlagToggle = !column.sortFlagToggle;
        let start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
        let end = start + this.pagination.itemsPerPage;
        this.volume.details = this.detailsCache.slice(start, end);
    }

    /**
     *
     * @param {VolumeDetail} volumeDetail
     * @returns {number}
     */
    getProgressPercentage(volumeDetail: VolumeDetail): string {
        return volumeDetail.totalPercentage.toString() + "%";
    }

    /**
     * 
     * @returns {string}
     */
    getOverflowX(): string {
        if (this.chartTypeSelectedItem.key === "stackedBar")
            return "scroll";
        if (this.chartTypeSelectedItem.key === "horizontalBar")
            return "hidden"
    }

    /**
     *
     * @returns {string}
     */
    getOverflowY(): string {
        if (this.chartTypeSelectedItem.key === "stackedBar")
            return "hidden";
        if (this.chartTypeSelectedItem.key === "horizontalBar")
            return "scroll"
    }
    
    /**
     *
     */
    ngOnInit() {
        this.brokerService
            .getAll()
            .subscribe(brokers => this.brokers = brokers);
        //data is of array type and should be later changed to a more model centric appraoch
        this.securityService
            .getAll()
            .subscribe(securities => this.securities = securities);
        this.columns = [
            new TableColumn({key: 'brokerName', value: 'Name'}),
            new TableColumn({key: 'buyer.volume', value: 'Buy Vol'}),
            new TableColumn({key: 'buyer.amount', value: 'Buy Value'}),
            new TableColumn({key: 'buyer.average', value: 'Buy Ave'}),
            new TableColumn({key: 'seller.volume', value: 'Sell Vol'}),
            new TableColumn({key: 'seller.amount', value: 'Sell Amt'}),
            new TableColumn({key: 'seller.average', value: 'Sell Ave'}),
            new TableColumn({key: 'netAmount', value: 'Net Amount'}),
            new TableColumn({key: 'totalValue', value: 'Total Value'}),
            new TableColumn({key: 'totalPercentage', value: '% Volume'})
        ];
    }
}