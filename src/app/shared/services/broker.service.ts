import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/rx';
import { Broker } from "./broker";
import {ConfigurationService} from "./configuration.service";
import {Injectable} from "@angular/core";

@Injectable()
export class BrokerService {
    private _pouchDb: PouchDB; 

    constructor(private configurationService: ConfigurationService) {
        let url = configurationService.items["couchdbUrl"];
        this._pouchDb = new PouchDB(url + 'brokers');
    }

    /**
     *
     */
    getAll(): Observable<Broker[]> {
        return Observable.fromPromise(
            this._pouchDb
                .allDocs({include_docs: true})
                .then(document => {
                    return document.rows.map(row => {
                        return new Broker({
                            id: row.doc._id,
                            name: row.doc.name
                        });
                    });
                }));
    }
}