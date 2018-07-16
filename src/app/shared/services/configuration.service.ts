import {Injectable} from "@angular/core";

@Injectable()
export class ConfigurationService {
    items: any[];

    constructor() {
        this.items = [];
        this.items['couchdbUrl'] = 'http://104.215.158.74:5984/';
    }
}