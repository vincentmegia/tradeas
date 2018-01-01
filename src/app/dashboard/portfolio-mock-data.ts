import { Portfolio } from "app/dashboard/portfolio";

export class PortfolioMockData {
    static MONTHLYPERFORMANCE: Portfolio[] = [
        new Portfolio({totalEquity: 22000.20, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 34000.90, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 42000.28, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 51000.93, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 62000.21, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 80000.23, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 62000.21, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 82000.12, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 102000.50, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 107000.23, broker: 'colfinancial'})
    ];

    static TRADETISTICS: any[] = [
        [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
        [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
    ];

    static PORTFOLIODAILY: Portfolio[] = [
        new Portfolio({totalEquity: 1000}),
        new Portfolio({totalEquity: 2000}),
        new Portfolio({totalEquity: 3000}),
    ];

    static PORTFOLIOWEEKLY: Portfolio[] = [
        new Portfolio({totalEquity: 10000}),
        new Portfolio({totalEquity: 20000}),
        new Portfolio({totalEquity: 30000}),
    ];
}