import { Injectable } from '@angular/core';
import * as Chartist from 'chartist';
import { Chart } from './chart';

export class TradetisticsRenderer {
    /**
     * 
     * @param elementName 
     * @param chart 
     */
    drawPerformance(elementName: string, chart: Chart): void {
        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];
        debugger;

        var data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        };
        Chartist.Line(elementName, chart.data, options, responsiveOptions);
    }
}