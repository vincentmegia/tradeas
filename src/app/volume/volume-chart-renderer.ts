import * as Chartist from 'chartist';
import {Chart} from "../dashboard/chart";


export class VolumeChartRenderer {
    /**
     * 
     * @param elementName 
     * @param chart 
     */
    draw(elementName: string, chart: Chart): void {
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
        let distance = Math.max(chart.data.series);
        let options = {
            seriesBarDistance: distance,
            reverseData: true,
            horizontalBars: true,
            axisY: {
                offset: 70
            }
        };
        Chartist.Bar(elementName, chart.data, options, responsiveOptions);
    }
}