import { Injectable } from '@angular/core';
import * as Chartist from 'chartist';
import { Chart } from './chart';

@Injectable()
export class PortfolioChartRenderer {

    /**
     * 
     * @param elementName 
     * @param chart 
     */
    drawMonthlyPerformance(elementName: string, chart: Chart): void {
        var options = {
            lineSmooth: false,
            axisY: {
                offset: 40,
                labelInterpolationFnc: function (value) {
                    return '$' + value;
                }

            },
            low: 10,
            height: "250px",
            high: 110,
            classNames: {
                point: 'ct-point ct-green',
                line: 'ct-line ct-green'
            }
        };

        var responsive = [
            ['screen and (max-width: 640px)', {
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];
        Chartist.Line(elementName, chart.data, options, responsive);
    }

    /**
     * 
     * @param elementName 
     * @param chart 
     */
    drawAnnualPerformance(elementName: string, chart: Chart) {
                var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };

        var optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };

        Chartist.Pie(elementName, dataPreferences, optionsPreferences);

        Chartist.Pie(elementName, {
            labels: ['62%', '32%', '6%'],
            series: [62, 32, 6]
        });
    }
}