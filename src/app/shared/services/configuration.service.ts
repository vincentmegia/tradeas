import {Injectable} from "@angular/core";

@Injectable()
export class ConfigurationService {
    items: any[];

    constructor() {
        this.items = [];
        this.items['couchdbUrl'] = 'https://couchdb-fecd7f.smileupps.com/';
    }
}