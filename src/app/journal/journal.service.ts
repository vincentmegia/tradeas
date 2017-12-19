import { Injectable } from '@angular/core';
import { Idea } from './idea/idea';
//import { JournalMockData } from './journal-mock-data';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/rx';
import * as moment from "moment";
import PouchDBFind from 'pouchdb-find'
PouchDB.plugin(PouchDBFind);

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
                .find({
                    selector: {
                        entryDate: { 
                            $gte: from, 
                            $lte: to
                        }
                    }
                })
                .then(response => {
                    console.log(response);
                    let ideas = response.docs.map(doc => {
                        // Convert string to date, doesn't happen automatically.
                        var idea = new Idea({
                            id: doc._id,
                            symbol: doc.symbol, 
                            type: doc.type, 
                            totalShares: doc.totalShares, 
                            averageBuyPrice: doc.averageBuyPrice, 
                            averageSellPrice: doc.averageSellPrice, 
                            chart: doc.chart, 
                            entryDate: doc.entryDate,
                            stars: doc.stars,
                            positions: doc.positions,
                            isSelected: doc.isSelected
                        });
                        return idea;
                });
                console.log(ideas);
                return ideas;
            })
        );
    }

    saveIdeas(): void {
        // debugger;
        // let ideas = JournalMockData.IDEAS;
        // this._pouchDb.bulkDocs(ideas);
    }
}