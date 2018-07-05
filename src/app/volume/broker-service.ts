import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/rx';
import * as moment from "moment";
import PouchDBFind from 'pouchdb-find';
import { Volume } from './volume';
import { Side } from "./side";
import { VolumeDetail } from "./volume-detail";
PouchDB.plugin(PouchDBFind);

@Injectable()
export class BrokerService {
    private _pouchDb: PouchDB;

    constructor() {
        this._pouchDb = new PouchDB('http://localhost:5984/brokers');
    }

    /**
     * Gets all Ideas based on date range
     */
    getBrokers(from: moment.Moment, to: moment.Moment): Observable<Volume[]> {
        debugger;
        return Observable.fromPromise(
            this._pouchDb
                .allDocs({include_docs: true})
                .then(response => {
                    console.log(response);

                    let volumes = response.docs.map(document => {
                        let volume = new Volume({
                            id: document._id,
                            symbol: document.symbol
                        });
                        volume.details = document.details.map(detail => new VolumeDetail({
                                brokerCode: detail.code,
                                buyer: new Side({
                                    amount: detail.buyAmount,
                                    volume: detail.buyVolume,
                                    average: detail.buyAverage}),
                                seller: new Side({
                                    amount: detail.sellAmount,
                                    volume: detail.sellVolume,
                                    average: detail.sellAverage}),
                                netAmount: detail.netAmount,
                                totalValue: detail.totalAmount
                            })
                        );
                        return volume;
                    });
                    console.log(volumes);
                    return volumes;
                })
        );
    }

    saveIdeas(): void {
        // debugger;
        // let ideas = JournalMockData.IDEAS;
        // this._pouchDb.bulkDocs(ideas);
    }
}