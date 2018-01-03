import { Injectable } from '@angular/core';
import { Idea } from './idea';
import { Transaction } from './transaction';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/rx';
import * as moment from "moment";
import PouchDBFind from 'pouchdb-find'

@Injectable()
export class TransactionService {
    private _pouchDb: PouchDB;

    constructor() {
        this._pouchDb = new PouchDB('http://localhost:5984/transactions');
    }

    // /**
    //  * Gets all transaction for a position
    //  */
    getTransactions(ideas: Idea[]): Observable<Transaction[]> {
        var keys = ideas.map(i => i.position.transactionsList.map(t => t))[0];
        var options = {
            include_docs: true,
            keys: keys
        };
        return Observable.fromPromise(
            this._pouchDb
                .allDocs(options)
                .then(response => {
                    console.log(response);
                    var transactions = response.rows.map(row => {
                        var transaction = new Transaction({
                            id: row.doc._id,
                            rev: row.doc._rev,
                            symbol: row.doc.symbol,
                            quantity: row.doc.quantity,
                            matchedQuantity: row.doc.matchedQuantity,
                            price: row.doc.price,
                            side: row.doc.side,
                            status: row.doc.status,
                            createdDate: row.doc.createdDate
                        });
                        return transaction;
                    });
                    return transactions;
                })
            );
    }

    // saveAll(ideas: Idea[]): void {
    //     debugger;
    //     var ideaJson = [];
    //     for (idea of ideas) {
    //         ideaJson.push(idea.)
    //     }
    //     this._pouchDb.bulkDocs(ideas);
    // }
}