import { Portfolio } from "app/dashboard/portfolio";
import { PortfolioSnapshot } from "app/dashboard/portfolio-snapshot";
import * as moment from "moment";

export class PortfolioMockData {
    static PORTFOLIO: Portfolio = new Portfolio({totalEquity: 1099984.33});
    
    static MONTHLYPERFORMANCE: PortfolioSnapshot[] = [
        new PortfolioSnapshot({totalEquity: 22000.20, broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 34000.90, broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 42000.28, broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 51000.93, broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 62000.21, broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 80000.23, broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 62000.21, broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 82000.12, broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 102000.50, broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 107000.23, broker: 'colfinancial'})
    ];

    static TRADETISTICS: any[] = [
        [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
        [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
    ];

    static PORTFOLIODAILY: PortfolioSnapshot[] = [
        new PortfolioSnapshot({totalEquity: 1099984.33, balance: 1099984.33, buyingPower: 1099984.33, 
            gainLossValue: 0, gainLossPercentage: 0, dayChangeValue: 0, dayChangePercentage: 0, createdDate: moment(new Date(2018, 0, 0)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 1099984.33, balance: 1099984.33, buyingPower: 1099984.33, 
            gainLossValue: 0, gainLossPercentage: 0, dayChangeValue: 0, dayChangePercentage: 0, createdDate: moment(new Date(2018, 0, 0)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 1098575.60, balance: 1000243.62, buyingPower: 1000243.62, 
            gainLossValue: -3957.02, gainLossPercentage: -3.87, dayChangeValue: -1308.19, dayChangePercentage: -0.12, createdDate: moment(new Date(2018, 0, 3)), broker: 'colfinancial'}),
    ];

    static PORTFOLIOWEEKLY: PortfolioSnapshot[] = [
        new PortfolioSnapshot({totalEquity: 10000}),
        new PortfolioSnapshot({totalEquity: 20000}),
        new PortfolioSnapshot({totalEquity: 30000}),
    ];
}