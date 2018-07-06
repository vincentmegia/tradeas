import * as Chartist from 'chartist';
import {Chart} from "../dashboard/chart";


export class VolumeChartRenderer {

    chart: Chart;
    
    /**
     * 
     * @param {string} chartType
     * @param {string} elementName
     * @param {Chart} chart
     */
    draw(chartType: string, elementName) {
       if (chartType === "stackedBar")
           this.drawStacked(elementName);
       else if (chartType === "horizontalBar")
           this.drawHorizontalBar(elementName);
       else if (chartType === "pie")
           this.drawPie(elementName);
    }
    
    /**
     *
     * @param elementName
     */
    private drawStacked(elementName: string): void {
        let responsiveOptions = [
            ['screen and (min-width: 641px) and (max-width: 1024px)', {
                showPoint: false,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        // Will return Mon, Tue, Wed etc. on medium screens
                        return value.slice(0, 3);
                    }
                }
            }],
            ['screen and (max-width: 640px)', {
                showLine: false,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        // Will return M, T, W etc. on small screens
                        return value[0];
                    }
                }
            }]
        ];

        let options = {
            stackBars: true,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return (value / 1000) + 'k';
                }
            }
        };
        Chartist
            .Bar(elementName, this.chart.data, options, responsiveOptions)
            .on('draw', function(data) {
                if(data.type === 'bar') {
                    data.element.attr({
                        style: 'stroke-width: 30px'
                    });
                }
            });
    }
    
    
    /**
     * 
     * @param elementName 
     */
    private drawHorizontalBar(elementName: string): void {
        let responsiveOptions = [
            ['screen and (min-width: 641px) and (max-width: 1024px)', {
                showPoint: false,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        // Will return Mon, Tue, Wed etc. on medium screens
                        return value.slice(0, 3);
                    }
                }
            }],
            ['screen and (max-width: 640px)', {
                showLine: false,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        // Will return M, T, W etc. on small screens
                        return value[0];
                    }
                }
            }]
        ];

        //find greatest value and set to seriesBarDistance
        let clone = this.chart.data.series[0].slice(0);
        let sorter = clone.sort().reverse();
        let distance = sorter[0];
        let options = {
            seriesBarDistance: distance,
            reverseData: true,
            horizontalBars: true,
            axisY: {
                offset: 70
            }
        };
        Chartist.Bar(elementName, this.chart.data, options, responsiveOptions);
    }

    
    /**
     *
     * @param elementName
     */
    private drawPie(elementName: string): void {
        let responsiveOptions = [
            ['screen and (min-width: 640px)', {
                labelOffset: 100,
                labelDirection: 'explode',
                labelInterpolationFnc: function(value) {
                    return value;
                }
            }],
            ['screen and (min-width: 2048px)', {
                labelOffset: 80,
            }]
        ];

        let options = {
            labelInterpolationFnc: function(value) {
                return value[0]
            }
        };
        this.chart.data.series = this.chart.data.series[0];
        Chartist.Pie(elementName, this.chart.data, options, responsiveOptions);
    }
}