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
            seriesBarDistance: 1000,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return (value / 1000) + 'k';
                }
            },
            width: this.computeWidth()
        };
        let data = {
            labels: this.chart.data.labels,
            series: this.chart.data.series
        };
        Chartist
            .Bar(elementName, data, options, responsiveOptions)
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
            axisX: {
                labelInterpolationFnc: function(value) {
                    return ((value / 100000)) * 100 + 'k';
                }  
            },
            axisY: {
                offset: 200
            },
            height: this.computeHeight(),
        };
        let data = {
            labels: this.chart.data.labels,
            series: this.chart.data.series
        };
        Chartist.Bar(elementName, data, options, responsiveOptions);
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
            },
        };
        let data = {
            labels: this.chart.data.labels,
            series: this.chart.data.series[0].slice(0)
        };
        Chartist.Pie(elementName, data, options, responsiveOptions);
    }

    /**
     * 
     * @returns {string}
     */
    private computeHeight(): string {
        if (this.chart.data.series[0].length >= 50)
            return this.chart.data.series[0].length * 30 + 'px';
        if (this.chart.data.series[0].length >= 40)
            return this.chart.data.series[0].length * 40 + 'px';
        if (this.chart.data.series[0].length >= 30)
            return this.chart.data.series[0].length * 50 + 'px';
        if (this.chart.data.series[0].length >= 20)
            return this.chart.data.series[0].length * 100 + 'px';
    }

    /**
     *
     * @returns {string}
     */
    private computeWidth(): string {
        if (this.chart.data.labels.length >= 50)
            return this.chart.data.labels.length * 100 + 'px';
        if (this.chart.data.labels.length >= 40)
            return this.chart.data.labels.length * 40 + 'px';
        if (this.chart.data.labels.length >= 30)
            return this.chart.data.labels.length * 50 + 'px';
        if (this.chart.data.labels.length >= 20)
            return this.chart.data.labels.length * 100 + 'px';
    }
}