import { Injectable } from '@angular/core';
import * as Chartist from 'chartist';
import { MockData } from './mock-data';
import { Chart } from './chart';

@Injectable()
export class TradetisticsService {

    /**
     * 
     */
    getMonthlyPerformance(): any {
        var data = {
            labels: Chart.MONTHS,
            //data here will be replace in the future by a service call
            series: MockData.TRADETISTICS
        };
        return data;
    }
}
