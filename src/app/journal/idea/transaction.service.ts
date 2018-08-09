import { Injectable } from '@angular/core';
import { Idea } from './idea';
import { Transaction } from './transaction';
import PouchDB from 'pouchdb';
import { Observable, from } from 'rxjs';
import {ConfigurationService} from "../../shared/services/configuration.service";

@Injectable()
export class TransactionService {
    private _pouchDb: PouchDB;

    constructor(private configurationService: ConfigurationService) {
        let url = configurationService.items["couchdbUrl"];
        this._pouchDb = new PouchDB(url + 'transactions');
    }

    // /**
    //  * Gets all transaction for a position
    //  */
    getTransactions(ideas: Idea[]): Observable<Transaction[]> {
        let keys = ideas.map(i => i.position.transactionIds)[0];
        let options = {
            include_docs: true,
            keys: keys
        };
        return from(
            this._pouchDb
                .allDocs(options)
                .then(response => {
                    console.log(response);
                    return response.rows.map(row => {
                        return new Transaction({
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
                    });
                })
            );
    }

    /**
     * 
     * @param ideas 
     */
    saveAll(transactions: Transaction[]): void {
        var transactionsJson = [];
        for (let transaction of transactions) {
            transactionsJson.push(transaction.json);
        }
        this._pouchDb.bulkDocs(transactionsJson);
    }
}