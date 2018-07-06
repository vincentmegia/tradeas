export class CompareService {

    /**
     *
     */
    /**
     *
     * @param {any[]} values
     * @param orderType
     * @param {string} direction
     * @returns {any[]}
     * @constructor
     */
    sort(values: any[], orderType: any, direction: string) {
        let tokens = orderType.split('.');
        if (direction === "asc"){
            //check if orderType has .
            return values.sort((a, b) => {
                if (tokens.length > 1) {
                    return (a[tokens[0]][tokens[1]] > b[tokens[0]][tokens[1]]) ? -1 : 1;
                }
                else {
                    return (a[orderType] > b[orderType]) ? -1 : 1;
                }
            });
        } else {
            return values.sort((a, b) => {
                if (tokens.length > 1) {
                    return (a[tokens[0]][tokens[1]] < b[tokens[0]][tokens[1]]) ? -1 : 1;
                } else {
                    return (a[orderType] < b[orderType]) ? -1 : 1;
                }
            });
        }
    }
}