import {Component, OnInit, ViewContainerRef} from '@angular/core';
import * as moment from "moment";
import {Pagination} from '../journal/pagination';
import {Volume} from './volume';
import { SecurityService } from '../shared/services/security.service'
import {Security} from "../shared/services/security";
import {VolumeService} from "./volume.service";
import {VolumeDetail} from "./volume-detail";
import {VolumeChartRenderer} from "./volume-chart-renderer";
import {Chart} from "../dashboard/chart";
import {DropdownItem} from "../shared/dropdown-item";

@Component({
    selector: 'volume-cmp',
    moduleId: module.id,
    templateUrl: 'volume.component.html',
    styleUrls: ['volume.component.css'],
    providers: [VolumeChartRenderer]
})

export class VolumeComponent implements OnInit {
    columns: string[];
    pagination: Pagination;
    volumes: Volume[];
    securities: Security[];
    startDate: Date;
    endDate: Date;
    selectedSymbol: string;
    chartDropdownItems: DropdownItem[];
    chartSelectedItem: DropdownItem;

    constructor(private securityService: SecurityService,
                private volumeService: VolumeService,
                private volumeChartRenderer: VolumeChartRenderer) {
        this.pagination = new Pagination({itemsPerPage: 10, currentPage: 1});
        this.chartDropdownItems = [
            new DropdownItem({key: 'totalValue', value: 'Total value'}),
            new DropdownItem({key: 'netAmount', value: 'Net Amount'}),
            new DropdownItem({key: 'buyVolume', value: 'Buy volume'}),
            new DropdownItem({key: 'sellVolume', value: 'Sell volume'}),
        ];
        this.chartSelectedItem = this.chartDropdownItems[0];
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
                hashMap.map(hashMap =>
                {
                    //compute for vol percentage
                    hashMap.totalPercentage = (hashMap.totalValue / totalValue) * 100;
                    details.push(hashMap);
                });

                details.sort((vol1, vol2): number => {
                    if (vol1.totalValue > vol2.totalValue) return -1;
                    if (vol1.totalValue < vol2.totalValue) return 1;
                    return 0;
                });
                let volume = volumes[0];
                volume.details = details;
                this.volumes = [];
                this.volumes.push(volume);
                console.log(this.volumes);

                //set chart
                let chart = new Chart();
                let labels = this.volumes[0].details.map(d => d.brokerCode);
                let series = this.volumes[0].details.map(d => d.totalValue);
                chart.data = {
                    labels: labels,
                    series: [series]
                };
                this.volumeChartRenderer.draw("#volumeChart", chart);
            });
    }

    /**
     * 
     * @param {string} columnName
     */
    onChartColumnClick(columnName: string): void {
        let chart = new Chart();
        let labels = [];
        let series = [];
        if (columnName === "totalValue") {
            this.chartSelectedItem = this.chartDropdownItems[0];
            labels = this.volumes[0].details.map(d => d.brokerCode);
            series = this.volumes[0].details.map(d => d.totalValue);
        } else if (columnName === "netAmount") {
            this.chartSelectedItem = this.chartDropdownItems[1];
            labels = this.volumes[0].details.map(d => d.brokerCode);
            series = this.volumes[0].details.map(d => d.netAmount);
        } else if (columnName === "buyVolume") {
            this.chartSelectedItem = this.chartDropdownItems[2];
            labels = this.volumes[0].details.map(d => d.brokerCode);
            series = this.volumes[0].details.map(d => d.buyer.volume);
        } else if (columnName === "sellVolume") {
            this.chartSelectedItem = this.chartDropdownItems[3];
            labels = this.volumes[0].details.map(d => d.brokerCode);
            series = this.volumes[0].details.map(d => d.seller.volume);
        }
        chart.data = {
            labels: labels,
            series: [series]
        };
        this.volumeChartRenderer.draw("#volumeChart", chart);
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
    ngOnInit(){
        //data is of array type and should be later changed to a more model centric appraoch
        this.securityService
            .getAll()
            .subscribe(securities => this.securities = securities);
        this.columns = ['', 'Net Buyers', 'Buy Vol', 'Buy Value', 'Buy Ave', 'Sell Vol', 'Sell Amt', 'Sell Ave', 'Net Amount', 'Total Value', '% Volume'];
    }
}
