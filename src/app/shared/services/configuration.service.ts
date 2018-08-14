import {Injectable} from "@angular/core";

@Injectable()
export class ConfigurationService {
    items: any[];

    constructor() {
        this.items = [];
        this.items['couchdbUrl'] = 'http://tradeasdb.southeastasia.cloudapp.azure.com:5984/';
    }
}