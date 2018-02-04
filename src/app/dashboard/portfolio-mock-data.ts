import { Portfolio } from "app/dashboard/portfolio";
import { PortfolioSnapshot } from "app/dashboard/portfolio-snapshot";
import * as moment from "moment";

export class PortfolioMockData {
    static PORTFOLIO: Portfolio = new Portfolio({totalEquity: 1099984.33});
    
    static MONTHLYPERFORMANCE: PortfolioSnapshot[] = [
        new PortfolioSnapshot({totalEquity:  1121206.06, balance: 613861.80, buyingPower: 613861.80, gainLossValue: 42231.05, gainLossPercentage: 9.08,
            dayChangeValue: -5514.22, dayChangePercentage: -0.49, createdDate: moment(new Date(2018, 0, 31)), broker: 'colfinancial'})
    ];

    static TRADETISTICS: any[] = [
        [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
        [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
    ];

    static PORTFOLIODAILY: PortfolioSnapshot[] = [
        new PortfolioSnapshot({totalEquity: 1099984.33, balance: 1099984.33, buyingPower: 1099984.33, gainLossValue: 0, gainLossPercentage: 0, 
            dayChangeValue: 0, dayChangePercentage: 0, createdDate: moment(new Date(2018, 0, 0)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 1099984.33, balance: 1099984.33, buyingPower: 1099984.33, gainLossValue: 0, gainLossPercentage: 0, 
            dayChangeValue: 0, dayChangePercentage: 0, createdDate: moment(new Date(2018, 0, 0)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 1098575.60, balance: 1000243.62, buyingPower: 1000243.62, gainLossValue: -3957.02, gainLossPercentage: -3.87, 
            dayChangeValue: -1308.19, dayChangePercentage: -0.12, createdDate: moment(new Date(2018, 0, 3)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 1098316.34, balance: 980480.49, buyingPower: 980480.49, gainLossValue: -4216.39, gainLossPercentage: -3.45, 
            dayChangeValue: -812.66, dayChangePercentage: -0.07, createdDate: moment(new Date(2018, 0, 4)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 1093919.02, balance: 866881.36, buyingPower: 866881.36, gainLossValue: -7034.96, gainLossPercentage: -3.01, 
            dayChangeValue: -4397.31, dayChangePercentage: -0.40, createdDate: moment(new Date(2018, 0, 5)), broker: 'colfinancial'}),           
        new PortfolioSnapshot({totalEquity: 1092968.96, balance: 866902.53, buyingPower: 866902.53, gainLossValue: -8006.19, gainLossPercentage: -3.42, 
            dayChangeValue: -971.23, dayChangePercentage: -0.09, createdDate: moment(new Date(2018, 0, 8)), broker: 'colfinancial'}),                
        new PortfolioSnapshot({totalEquity: 1096004.18, balance: 895415.66, buyingPower: 895415.66, gainLossValue: -3861.00, gainLossPercentage: -1.89, 
            dayChangeValue: 4360.62, dayChangePercentage: 0.40, createdDate: moment(new Date(2018, 0, 9)), broker: 'colfinancial'}),                
        new PortfolioSnapshot({totalEquity: 1092436.71, balance: 811912.08, buyingPower: 811912.08, gainLossValue: -5938.13, gainLossPercentage: -2.07, 
            dayChangeValue: 4009.79, dayChangePercentage: 0.37, createdDate: moment(new Date(2018, 0, 10)), broker: 'colfinancial'}),                
        new PortfolioSnapshot({totalEquity: 1089920.52, balance: 812345.25, buyingPower: 812345.25, gainLossValue: -8375.79, gainLossPercentage: -2.93, 
            dayChangeValue: -2516.19, dayChangePercentage: -0.23, createdDate: moment(new Date(2018, 0, 11)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 1089369.12, balance: 815169.37, buyingPower: 815169.37, gainLossValue: -10267.01, gainLossPercentage: -3.61,
            dayChangeValue: -551.39, dayChangePercentage: -0.05, createdDate: moment(new Date(2018, 0, 12)), broker: 'colfinancial'}),                                        
        new PortfolioSnapshot({totalEquity: 1073612.67, balance: 968454.34, buyingPower: 968454.34, gainLossValue: -3196.19, gainLossPercentage: -2.95,
            dayChangeValue: -15756.45, dayChangePercentage: -1.45, createdDate: moment(new Date(2018, 0, 15)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 1076491.16, balance: 798422.35, buyingPower: 798422.35, gainLossValue: 1064.99, gainLossPercentage: 0.38,
            dayChangeValue: 2878.49, dayChangePercentage: 0.27, createdDate: moment(new Date(2018, 0, 16)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 1081633.13, balance: 865782.44, buyingPower: 865782.44, gainLossValue: 7339.49, gainLossPercentage: 3.52,
            dayChangeValue: 5141.98, dayChangePercentage: 0.48, createdDate: moment(new Date(2018, 0, 17)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity:  1076625.66, balance: 857895.97, buyingPower: 857895.97, gainLossValue: 2847.36, gainLossPercentage: 1.32,
            dayChangeValue: -5007.47, dayChangePercentage: -0.46, createdDate: moment(new Date(2018, 0, 18)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity:  1077650.50, balance: 894018.85, buyingPower: 894018.85, gainLossValue: -5136.69, gainLossPercentage: -2.72,
            dayChangeValue: 990.63, dayChangePercentage: 0.09, createdDate: moment(new Date(2018, 0, 19)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity:  1079141.88, balance: 913091.45, buyingPower: 913091.45, gainLossValue: -6701.46, gainLossPercentage: -3.88,
            dayChangeValue: 1491.38, dayChangePercentage: 0.14, createdDate: moment(new Date(2018, 0, 20)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity:  1092014.21, balance: 838018.01, buyingPower: 838018.01, gainLossValue: 7844.69, gainLossPercentage: 3.19,
            dayChangeValue: 12872.34, dayChangePercentage: 1.19, createdDate: moment(new Date(2018, 0, 21)), broker: 'colfinancial'}),                        
        new PortfolioSnapshot({totalEquity:  1092014.21, balance: 838018.01, buyingPower: 838018.01, gainLossValue: 7844.69, gainLossPercentage: 3.19,
            dayChangeValue: 12872.34, dayChangePercentage: 1.19, createdDate: moment(new Date(2018, 0, 22)), broker: 'colfinancial'}),                        
        new PortfolioSnapshot({totalEquity:  1092014.21, balance: 838018.01, buyingPower: 838018.01, gainLossValue: 7844.69, gainLossPercentage: 3.19,
            dayChangeValue: 12872.34, dayChangePercentage: 1.19, createdDate: moment(new Date(2018, 0, 23)), broker: 'colfinancial'}),                        
        new PortfolioSnapshot({totalEquity:  1092014.21, balance: 838018.01, buyingPower: 838018.01, gainLossValue: 7844.69, gainLossPercentage: 3.19,
            dayChangeValue: 12872.34, dayChangePercentage: 1.19, createdDate: moment(new Date(2018, 0, 24)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity:  1078195.45, balance: 770018.54, buyingPower: 770018.54, gainLossValue: 22702.54, gainLossPercentage: 7.95,
            dayChangeValue: -23324.62, dayChangePercentage: 2.12, createdDate: moment(new Date(2018, 0, 25)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity:  1081471.73, balance: 837572.53, buyingPower: 837572.53, gainLossValue: 1903.83, gainLossPercentage: 0.79,
            dayChangeValue: 3276.28, dayChangePercentage: 0.30, createdDate: moment(new Date(2018, 0, 26)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity:  1093669.75, balance: 525683.14, buyingPower: 525683.14, gainLossValue: 14098.69, gainLossPercentage: 2.55,
            dayChangeValue: 12198.03, dayChangePercentage: 1.13, createdDate: moment(new Date(2018, 0, 29)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity:  1126720.28, balance: 615536.69, buyingPower: 615536.69, gainLossValue: 46070.38, gainLossPercentage: 9.91,
            dayChangeValue: 33050.53, dayChangePercentage: 3.02, createdDate: moment(new Date(2018, 0, 30)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity:  1121206.06, balance: 613861.80, buyingPower: 613861.80, gainLossValue: 42231.05, gainLossPercentage: 9.08,
            dayChangeValue: -5514.22, dayChangePercentage: -0.49, createdDate: moment(new Date(2018, 0, 31)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity:  1121206.06, balance: 613861.80, buyingPower: 613861.80, gainLossValue: 42231.05, gainLossPercentage: 9.08,
            dayChangeValue: -5514.22, dayChangePercentage: -0.49, createdDate: moment(new Date(2018, 1, 0)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity:  1121671.88, balance: 481182.03, buyingPower: 481182.03, gainLossValue: 38569.37, gainLossPercentage: 6.41,
            dayChangeValue: 465.82, dayChangePercentage: 0.04, createdDate: moment(new Date(2018, 1, 1)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity:  1135804.56, balance: 525073.96, buyingPower: 525073.96, gainLossValue: 46340.21, gainLossPercentage: 8.21,
            dayChangeValue: 14132.69, dayChangePercentage: 1.26, createdDate: moment(new Date(2018, 1, 2)), broker: 'colfinancial'}),                                    
    ]; 

    static PORTFOLIOWEEKLY: PortfolioSnapshot[] = [
        new PortfolioSnapshot({totalEquity: 1093919.02, balance: 866881.36, buyingPower: 866881.36, gainLossValue: -7034.96, gainLossPercentage: -3.01, 
            dayChangeValue: -4397.31, dayChangePercentage: -0.40, createdDate: moment(new Date(2018, 0, 5)), broker: 'colfinancial'}),
        new PortfolioSnapshot({totalEquity: 1089369.12, balance: 815169.37, buyingPower: 815169.37, gainLossValue: -10267.01, gainLossPercentage: -3.61,
            dayChangeValue: -551.39, dayChangePercentage: -0.05, createdDate: moment(new Date(2018, 0, 12)), broker: 'colfinancial'}),                                                    
        new PortfolioSnapshot({totalEquity:  1077650.50, balance: 894018.85, buyingPower: 894018.85, gainLossValue: -5136.69, gainLossPercentage: -2.72,
            dayChangeValue: 990.63, dayChangePercentage: 0.09, createdDate: moment(new Date(2018, 0, 19)), broker: 'colfinancial'}), 
        new PortfolioSnapshot({totalEquity:  1081471.73, balance: 837572.53, buyingPower: 837572.53, gainLossValue: 1903.83, gainLossPercentage: 0.79,
            dayChangeValue: 3276.28, dayChangePercentage: 0.30, createdDate: moment(new Date(2018, 0, 26)), broker: 'colfinancial'}),    
        new PortfolioSnapshot({totalEquity:  1135804.56, balance: 525073.96, buyingPower: 525073.96, gainLossValue: 46340.21, gainLossPercentage: 8.21,
            dayChangeValue: 14132.69, dayChangePercentage: 1.26, createdDate: moment(new Date(2018, 1, 2)), broker: 'colfinancial'}),                                           
    ];
}