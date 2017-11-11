import { Idea } from './idea';
import * as moment from "moment";

export class JournalMockData {
    static IDEAS: Idea[] = [
        new Idea({
            symbol: '2GO',
            type: 'TF', 
            shares: 100000, 
            averagePrice: 20, 
            sell: 28.5,  
            chart: 'https://storage.investagrams.com/files/Chart/tv/2017/07/16/20170716-093124-gThWEagL.jpg', 
            entryDate: moment(new Date(2017, 4, 20)),
            stars: [0,1,2]
        }),
        new Idea({
            symbol: 'MAC', 
            type: 'TF',
            shares: 100000, 
            averagePrice: 6, 
            sell: 9, 
            chart: 'https://storage.investagrams.com/files/Chart/tv/2017/07/16/20170716-094405-EmwJ8Bqn.jpg',
            entryDate: moment(new Date(2017, 7, 16)), 
            stars: [0,1,2] 
        }),
        new Idea({
            symbol: 'PXP', 
            type: 'ABO', 
            shares: 4400, 
            averagePrice: 9.10, 
            sell: 8.46, 
            chart: 'https://storage.investagrams.com/files/Chart/tv/2017/11/11/20171111-152441-4iqNjOKc.jpg', 
            entryDate: moment(new Date(2017, 11, 11)),
            stars: [0]
        }),
        new Idea({
            symbol: 'GSMI', 
            type: 'ABO', 
            shares: 2400, 
            averagePrice: 28.8, 
            sell: 26.8, 
            chart: 'https://storage.investagrams.com/files/Chart/tv/2017/11/11/20171111-153535-qFtiU8s1.jpg', 
            entryDate: moment(new Date(2017, 11, 11)),
            stars: [0]
        })
    ];
}