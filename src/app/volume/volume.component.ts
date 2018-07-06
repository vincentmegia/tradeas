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
    volumes: Volume[];
    securities: Security[];
    startDate: Date;
    endDate: Date;
    selectedSymbol: string;
    chartDropdownItems: DropdownItem[];
    chartSelectedItem: DropdownItem;
    chartTypeDropdownItems: DropdownItem[];
    chartTypeSelectedItem: DropdownItem;

    constructor(private securityService: SecurityService,
                private volumeService: VolumeService,
                private volumeChartRenderer: VolumeChartRenderer,
                private compareService: CompareService) {
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
    }

    /**
     *
     */
    onSearch(): void {
        this.volumeService
            .getVolumes(this.selectedSymbol, moment(this.startDate), moment(this.endDate))
            .subscribe(volumes => {
                let mergedDetails = [];
                volumes.map(v => {
                    v.details.map(d => mergedDetails.push(d));
                });

                let hashMap = [];
                let totalValue = 0;
                mergedDetails.map(m => {
                    totalValue += m.totalValue;
                    if (!hashMap[m.brokerCode]) {//use id for now
                        hashMap[m.brokerCode] = m;
                        return m;
                    }

                    hashMap[m.brokerCode].buyer.average += m.buyer.average;
                    hashMap[m.brokerCode].buyer.amount += m.buyer.amount;
                    hashMap[m.brokerCode].buyer.volume += m.buyer.volume;
                    hashMap[m.brokerCode].seller.average += m.seller.average;
                    hashMap[m.brokerCode].seller.amount += m.seller.amount;
                    hashMap[m.brokerCode].seller.volume += m.seller.volume;
                    hashMap[m.brokerCode].netAmount += m.netAmount;
                    hashMap[m.brokerCode].totalValue += m.totalValue;
                    return m;
                });

                let details = [];
                //convert hasmap to array
                hashMap.map(hashMap => {
                    //compute for vol percentage
                    hashMap.totalPercentage = (hashMap.totalValue / totalValue) * 100;
                    details.push(hashMap);
                });

                details.sort((vol1, vol2): number => {
                    if (vol1.totalValue > vol2.totalValue) return -1;
                    if (vol1.totalValue < vol2.totalValue) return 1;
                    return 0;
                });

                volumes[0].details = details;
                this.volumes = [];
                this.volumes.push(volumes[0]);
                this.volumes = volumes.slice(0);
                console.log(this.volumes);

                //set chart
                let chart = new Chart();
                let labels = this.volumes[0].details.map(d => d.brokerCode);
                let series = this.volumes[0].details.map(d => d.totalValue);
                chart.data = {
                    labels: labels,
                    series: [series]
                };
                this.volumeChartRenderer.chart = chart;
                this.volumeChartRenderer.draw(this.chartTypeSelectedItem.key,"#volumeChart");
            });
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
            labels = this.volumes[0].details.map(d => d.brokerCode);
            series = this.volumes[0].details.map(d => d.totalValue);
        } else if (column === "netAmount") {
            this.chartSelectedItem = this.chartDropdownItems[1];
            labels = this.volumes[0].details.map(d => d.brokerCode);
            series = this.volumes[0].details.map(d => d.netAmount);
        } else if (column === "buyer.volume") {
            this.chartSelectedItem = this.chartDropdownItems[2];
            labels = this.volumes[0].details.map(d => d.brokerCode);
            series = this.volumes[0].details.map(d => d.buyer.volume);
        } else if (column === "seller.volume") {
            this.chartSelectedItem = this.chartDropdownItems[3];
            labels = this.volumes[0].details.map(d => d.brokerCode);
            series = this.volumes[0].details.map(d => d.seller.volume);
        } else if (column === "totalPercentage") {
            this.chartSelectedItem = this.chartDropdownItems[3];
            labels = this.volumes[0].details.map(d => d.brokerCode);
            series = this.volumes[0].details.map(d => d.totalPercentage);
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
            this.volumes[0].details,
            column.key, 
            column.sortFlagToggle ? "asc" : "desc")
            .map(item => item.totalValue);
        column.sortFlagToggle = !column.sortFlagToggle;
    }

    /**
     *
     * @param {VolumeDetail} volumeDetail
     * @returns {number}
     */
    getProgressPercentage(volumeDetail: VolumeDetail) {
        return volumeDetail.totalPercentage.toString() + "%";
    }

    /**
     *
     */
    ngOnInit() {
        //data is of array type and should be later changed to a more model centric appraoch
        this.securityService
            .getAll()
            .subscribe(securities => this.securities = securities);
        this.columns = [
            new TableColumn({key: '', value: ''}),
            new TableColumn({key: 'brokerCode', value: 'Name'}),
            new TableColumn({key: 'buyer.volume', value: 'Buy Vol'}),
            new TableColumn({key: 'buyer.amount', value: 'Buy Value'}),
            new TableColumn({key: 'buyer.average', value: 'Buy Ave'}),
            new TableColumn({key: 'seller.volume', value: 'Sell Vol'}),
            new TableColumn({key: 'seller.amount', value: 'Sell Amt'}),
            new TableColumn({key: 'seller.average', value: 'Sell Ave'}),
            new TableColumn({key: 'netAmount', value: 'Net Amount'}),
            new TableColumn({key: 'totalValue', value: 'Total Value'}),
            new TableColumn({key: 'percentageVolume', value: '% Volume'})
        ];
    }
}