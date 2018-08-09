import { Injectable } from '@angular/core';
import { Idea } from './idea/idea';
import { Position } from './idea/position';
import PouchDB from 'pouchdb';
import { Observable, of } from 'rxjs';
import * as moment from "moment";
import PouchDBFind from 'pouchdb-find'
import { TransactionService } from './idea/transaction.service';
import { ConfigurationService } from "../shared/services/configuration.service";
PouchDB.plugin(PouchDBFind);

@Injectable({
    providedIn: 'root',
})
export class JournalService {
    private _pouchDb: PouchDB;

    constructor(private transactionService: TransactionService,
                private configurationService: ConfigurationService) {
        let url = configurationService.items["couchdbUrl"];
        this._pouchDb = new PouchDB(url + 'journal');
    }

    /**
     * Gets all Ideas based on date range
     */
    getIdeas(from: moment.Moment, to: moment.Moment): Observable<Idea[]> {
        return of(
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
                        var idea = new Idea({
                            id: doc._id,
                            revision: doc._rev,
                            symbol: doc.symbol, 
                            type: doc.type, 
                            chart: doc.chart, 
                            entryDate: doc.entryDate,
                            status: doc.status,
                            stars: doc.stars,
                            position: new Position({
                                transactionId: doc.position.transactionId,
                                orderId: doc.position.orderId,
                                symbol: doc.position.symbol,
                                status: doc.position.status,
                                createdDate: doc.position.createdDate,
                                transactionIds: doc.position.transactionIds
                            }),
                            isSelected: false
                        });

                        if (doc.position.transactionIds != null && doc.position.transactionIds.length > 0) {
                            this.transactionService
                                .getTransactions([idea])
                                .subscribe(transactions => {
                                    idea.position.transactionsStore = transactions;
                                    idea.isSelected = true;
                                });
                        }
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