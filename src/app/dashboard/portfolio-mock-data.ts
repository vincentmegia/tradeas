import { Portfolio } from "app/dashboard/portfolio";

export class PortfolioMockData {
    static MONTHLYPERFORMANCE: Portfolio[] = [
        new Portfolio({totalEquity: 22.20, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 34.90, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 42.28, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 51.93, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 62.21, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 80.23, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 62.21, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 82.12, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 102.50, broker: 'colfinancial'}),
        new Portfolio({totalEquity: 107.23, broker: 'colfinancial'})
    ];

    static TRADETISTICS: any[] = [
        [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
        [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
    ];

    static PORTFOLIODAILY: Portfolio[] = [
        new Portfolio({totalEquity: 10}),
        new Portfolio({totalEquity: 20}),
        new Portfolio({totalEquity: 30}),
    ];

    static PORTFOLIOWEEKLY: Portfolio[] = [
        new Portfolio({totalEquity: 10}),
        new Portfolio({totalEquity: 20}),
        new Portfolio({totalEquity: 30}),
    ];
}