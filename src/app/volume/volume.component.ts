import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
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
import { LoadingBarService } from "@ngx-loading-bar/core";
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {VolumeParameter} from "./volume-parameter";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

declare var $:any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'volume-cmp',
    moduleId: module.id,
    templateUrl: 'volume.component.html',
    styleUrls: ['volume.component.css'],
    providers: [VolumeChartRenderer, CompareService]
})
export class VolumeComponent implements OnInit, OnDestroy {
    columns: TableColumn[];
    pagination: Pagination;
    volume: Volume;
    detailsCache: VolumeDetail[];
    securities: Security[];
    startDate: Date;
    endDate: Date;
    selectedSecurity: Security;
    chartDropdownItems: DropdownItem[];
    chartSelectedItem: DropdownItem;
    chartTypeDropdownItems: DropdownItem[];
    chartTypeSelectedItem: DropdownItem;
    isChartCollapse: boolean;
    isBuyerSellerCollapsed: boolean;
    brokers: Broker[];  
    maxDate: Date;
    startTime: moment.Moment;
    elapsedMinutes: number;
    elapsedTime: moment.Moment;
    dataTableOptions: DataTables.Settings = {};
    dataTableTrigger: Subject<Volume> = new Subject();
    chartSwitch: boolean;
    stockSwitch: boolean;

    constructor(private securityService: SecurityService,
                private volumeService: VolumeService,
                private volumeChartRenderer: VolumeChartRenderer,
                private compareService: CompareService,
                private brokerService: BrokerService,
                private loadingBar: LoadingBarService,
                private zone: NgZone) {
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
        this.maxDate = new Date();
        this.elapsedMinutes = 0;
        this.startTime = moment();
        this.chartSwitch = true;
        this.stockSwitch = true;
    }

    /**
     * 
     * @returns {NgbDateStruct}
     */
    getMaxDate(): NgbDateStruct {
        let now = new Date();
        let date = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
        //console.log(date);
        return date;
    }


    
    /**
     *
     */
    onSearch(): void {
        this.elapsedTime = this.startTime;
        this.loadingBar.start();
        this.volumeService
            .getVolumes(new VolumeParameter({
                symbol: this.selectedSecurity.symbol, 
                from: moment(this.startDate),
                to: moment(this.endDate)}))
            .subscribe(
                (volumes) => {
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
                    //volumes[0].details = this.detailsCache.slice(0, this.pagination.itemsPerPage);
                    volumes[0].details = this.detailsCache.slice(0);
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
                    this.volumeChartRenderer.draw(this.chartTypeSelectedItem.key, "#volumeChart");
                    this.isChartCollapse = false;
                    this.isBuyerSellerCollapsed = false;
                    
                    this.dataTableTrigger.next();
                },
                (error) => console.log(error),
                () => {
                    this.loadingBar.stop();
                    this.zone.run(() => {
                        setInterval(() => {
                            this.elapsedMinutes = moment.duration(moment().diff(this.elapsedTime)).asMinutes();
                        }, 60000);                        
                    });
                }
            );
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
     * @param {Observable<string>} text$
     * @returns {Observable<any[] | Security[]>}
     */
    searchSecurities = (text$: Observable<string>) => text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term.length < 1
            ? []
            : this
                .securities
                .filter(v => v.symbol.toLowerCase().indexOf(term.toLowerCase()) > -1))
        );

    /**
     * 
     * @param {string} result
     * @returns {string}
     */
    securitiesResultFormatter = (result: Security) => result.symbol.toUpperCase();

    /**
     * 
     * @param {Security} result
     * @returns {string}
     */
    securitiesInputFormatter = (result: Security) => `${result.symbol.toUpperCase()} - ${result.name}`;
    
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
            new TableColumn({key: 'buyer.amount', value: 'Buy Amt'}),
            new TableColumn({key: 'buyer.average', value: 'Buy Ave'}),
            new TableColumn({key: 'seller.volume', value: 'Sell Vol'}),
            new TableColumn({key: 'seller.amount', value: 'Sell Amt'}),
            new TableColumn({key: 'seller.average', value: 'Sell Ave'}),
            new TableColumn({key: 'netAmount', value: 'Net Amount'}),
            new TableColumn({key: 'totalValue', value: 'Total Value'}),
            new TableColumn({key: 'totalPercentage', value: '% Volume'})
        ];
        
        this.dataTableOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            destroy: true
        };
    }

    /**
     * 
     */
    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dataTableTrigger.unsubscribe();
        //$('#datatable').DataTable().destroy(true);
    }
}