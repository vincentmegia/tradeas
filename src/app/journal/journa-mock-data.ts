import { Idea } from './idea/idea';
import { Star } from './idea/star';
import { Position } from './idea/position';
import * as moment from "moment";

export class JournalMockData {
    static IDEAS: Idea[] = [
        new Idea({
            id: '2GOApril2017120000',
            symbol: '2GO',
            type: 'TF', 
            totalShares: 100000, 
            averageBuyPrice: 20, 
            averageSellPrice: 28.5,  
            chart: 'https://storage.investagrams.com/files/Chart/tv/2017/07/16/20170716-093124-gThWEagL.jpg',
            entryDate: moment(new Date(2017, 4, 20)),
            stars: [new Star({id: 0}), new Star({id: 1}), new Star({id: 2})],
            positions: []
        }),
        new Idea({
            id: 'MACJuly162007120000',
            symbol: 'MAC', 
            type: 'TF',
            totalShares: 100000, 
            averageBuyPrice: 6, 
            averageSellPrice: 9, 
            chart: 'https://storage.investagrams.com/files/Chart/tv/2017/07/16/20170716-094405-EmwJ8Bqn.jpg',
            entryDate: moment(new Date(2017, 7, 16)), 
            stars: [new Star({id: 0}), new Star({id: 1}), new Star({id: 2})],
            positions: []
        }),
        new Idea({
            id: 'PXPDecember112007120000',
            symbol: 'PXP', 
            type: 'ABO', 
            totalShares: 4400, 
            averageBuyPrice: 9.10, 
            averageSellPrice: 8.46, 
            chart: 'https://storage.investagrams.com/files/Chart/tv/2017/11/11/20171111-152441-4iqNjOKc.jpg', 
            entryDate: moment(new Date(2017, 11, 11)),
            stars: [new Star({id: 0})],
            positions: []
        }),
        new Idea({
            id: 'GSMIDecember112007120000',
            symbol: 'GSMI', 
            type: 'ABO', 
            totalShares: 2400, 
            averageBuyPrice: 28.8, 
            averageSellPrice: 26.8, 
            chart: 'https://storage.investagrams.com/files/Chart/tv/2017/11/11/20171111-153535-qFtiU8s1.jpg', 
            entryDate: moment(new Date(2017, 11, 11)),
            stars: [new Star({id: 0})],
            positions: []
        }),
        new Idea({
            id: 'NOWNovember272007120000',
            symbol: 'NOW', 
            type: 'TF', 
            totalShares: 3000, 
            averageBuyPrice: 2.81, 
            averageSellPrice: 2.82, 
            chart: 'https://storage.investagrams.com/files/Chart/tv/2017/11/27/20171127-231832-awLKaJV9.jpg', 
            entryDate: moment(new Date(2017, 10, 27)),
            stars: [new Star({id: 0})],
            positions: []
        }),
        new Idea({
            id: 'NOWNovember272007120000',
            symbol: 'NOW', 
            type: 'TF', 
            totalShares: 3000, 
            averageBuyPrice: 2.81, 
            averageSellPrice: 3.06, 
            chart: 'https://storage.investagrams.com/files/Chart/tv/2017/11/27/20171127-231832-awLKaJV9.jpg', 
            entryDate: moment(new Date(2017, 10, 27)),
            stars: [new Star({id: 0})],
            positions: []
        }),
        new Idea({
            id: 'STINovember272007120000',
            symbol: 'STI', 
            type: 'TF', 
            totalShares: 47000, 
            averageBuyPrice: 1.636089, 
            averageSellPrice: null, 
            chart: '', 
            entryDate: moment(new Date(2017, 10, 27)),
            stars: [new Star({id: 0})],
            positions: []
        }),
        new Idea({
            id: 'ROCKNovember272007120000',
            symbol: 'ROCK', 
            type: 'TF', 
            totalShares: 10000, 
            averageBuyPrice: 2.181418, 
            averageSellPrice: null, 
            chart: '', 
            entryDate: moment(new Date(2017, 10, 27)),
            stars: [new Star({id: 0})],
            positions: []
        }),
        new Idea({
            id: 'PFNovember272007120000',
            symbol: 'PF', 
            type: 'TF', 
            totalShares: 40, 
            averageBuyPrice: 527.802750, 
            averageSellPrice: null, 
            chart: '', 
            entryDate: moment(new Date(2017, 10, 27)),
            stars: [new Star({id: 0})],
            positions: []
        }),
        new Idea({
            id: 'MRCNovember272007120000',
            symbol: 'MRC', 
            type: 'TF', 
            totalShares: 50000, 
            averageBuyPrice: 0.3831, 
            averageSellPrice: 0.39, 
            chart: '', 
            entryDate: moment(new Date(2017, 10, 27)),
            stars: [new Star({id: 0})],
            positions: []
        }),
        new Idea({
            symbol: 'MJC', 
            type: 'Tsupit', 
            totalShares: 2000, 
            averageBuyPrice: 5.10, 
            averageSellPrice: 5.10, 
            chart: '', 
            entryDate: moment(new Date(2017, 11, 5)),
            stars: [new Star({id: 0})],
            positions: []
        }),
        new Idea({
            id: 'MJC40000',
            symbol: 'MJC', 
            type: 'Tsupit', 
            totalShares: 4000, 
            averageBuyPrice: 0, 
            averageSellPrice: 5.9, 
            chart: '', 
            entryDate: moment(new Date(2017, 11, 5)),
            stars: [new Star({id: 0})],
            positions: [
                new Position({shares: 2000, buyPrice: 6.11, entryDate: moment(new Date(2017, 11, 5))}),
                new Position({shares: 2000, buyPrice: 6.06, entryDate: moment(new Date(2017, 11, 5))})
            ],
            isSelected: true
        }),                
        new Idea({
            id: 'TEST5000003831',
            symbol: 'TEST', 
            type: 'TF', 
            totalShares: 50000, 
            averageBuyPrice: 0.3831, 
            averageSellPrice: null, 
            chart: '', 
            entryDate: moment(new Date(2017, 10, 27)),
            stars: [new Star({id: 0})],
            positions: [
                new Position({shares: 35000, buyPrice: .35, entryDate: moment(new Date(2017, 11, 3))}),
                new Position({shares: 15000, buyPrice: .37, entryDate: moment(new Date(2017, 11, 3))})
            ],
            isSelected: true
        }),
    ];
}