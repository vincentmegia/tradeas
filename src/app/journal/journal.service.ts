import { Injectable } from '@angular/core';
import { Idea } from './idea/idea';
//import { JournalMockData } from './journa-mock-data';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/rx';

@Injectable()
export class JournalService {
    private _pouchDb: PouchDB;

    constructor() {
        this._pouchDb = new PouchDB('http://localhost:5984/tradeas');
    }

    /**
     * Gets all Ideas based on date range
     */
    getIdeas(from: Date, to: Date): Observable<Idea[]> {
        var ideas = new Observable<Idea[]>();
        return Observable.fromPromise(
            this._pouchDb
                .allDocs({include_docs: true})
                .then(document => {
                    // Each row has a .doc object and we just want to send an 
                    // array of birthday objects back to the calling code,
                    // so let's map the array to contain just the .doc objects.
                    return document.rows.map(row => {
                        // Convert string to date, doesn't happen automatically.
                        console.log(row);
                        return row.doc;
                });
        }));
    }
}