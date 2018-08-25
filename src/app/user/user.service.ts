import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Observable, from, of } from 'rxjs';
import PouchDBFind from 'pouchdb-find';
import { ConfigurationService } from "../shared/services/configuration.service";
import { User } from "./user";
PouchDB.plugin(PouchDBFind);

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _pouchDb: PouchDB;
    private batchCount: number;

    constructor(private configurationService: ConfigurationService) {
        let url = configurationService.items["couchdbUrl"];
        this._pouchDb = new PouchDB(url + 'users');
        this.batchCount = 0;
    }

    /**
     * Gets all Ideas based on date range
     */
    getUser(username: string): Observable<User[]> {
        return from (
        this._pouchDb
            .find({
                selector: {
                    username: username
                }
            })
            .then(response => {
                return response.rows.map(row => {
                    return new User({
                        id: row.doc._id,
                        username: username,
                        profile: {
                            chart: row.doc.profile.chart, 
                            stock: row.doc.profile.stock
                        }
                    });
                })
            })
        );
    }
}