import { Injectable } from '@angular/core';
import { Idea } from './idea/idea';
//import { JournalMockData } from './journal-mock-data';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/rx';
import * as moment from "moment";

@Injectable()
export class JournalService {
    private _pouchDb: PouchDB;

    constructor() {
        this._pouchDb = new PouchDB('http://localhost:5984/tradeas');
    }

    /**
     * Gets all Ideas based on date range
     */
    getIdeas(from: moment.Moment, to: moment.Moment): Observable<Idea[]> {
        return Observable.fromPromise(
            this._pouchDb
                .allDocs({include_docs: true})
                .then(document => {
                    // Each row has a .doc object and we just want to send an 
                    // array of birthday objects back to the calling code,
                    // so let's map the array to contain just the .doc objects.
                    return document.rows.map(row => {
                        // Convert string to date, doesn't happen automatically.
                        var idea = new Idea({
                            id: row.doc.id,
                            symbol: row.doc.symbol, 
                            type: row.doc.type, 
                            totalShares: row.doc.totalShares, 
                            averageBuyPrice: row.doc.averageBuyPrice, 
                            averageSellPrice: row.doc.averageSellPrice, 
                            chart: row.doc.chart, 
                            entryDate: row.doc.entryDate,
                            stars: row.doc.stars,
                            positions: row.doc.positions,
                            isSelected: row.doc.isSelected
                        });
                        return idea;
                });
        }));
    }

    saveIdeas(): void {
        // debugger;
        // let ideas = JournalMockData.IDEAS;
        // this._pouchDb.bulkDocs(ideas);
    }
}