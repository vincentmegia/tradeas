import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Observable, from, of } from 'rxjs';
import * as moment from "moment";
import PouchDBFind from 'pouchdb-find';
import { Volume } from './volume';
import { Side } from "./side";
import { VolumeDetail } from "./volume-detail";
import { ConfigurationService } from "../shared/services/configuration.service";
import { VolumeParameter } from "./volume-parameter";
PouchDB.plugin(PouchDBFind);

@Injectable({
    providedIn: 'root',
})
export class VolumeService {
    private _pouchDb: PouchDB;
    private batchCount: number;

    constructor(private configurationService: ConfigurationService) {
        let url = configurationService.items["couchdbUrl"];
        this._pouchDb = new PouchDB(url + 'broker-transactions');
        this.batchCount = 0;
    }

    
    
    /**
     * Gets all Ideas based on date range
     */
    getVolumes(volumeParameter: VolumeParameter): Observable<Volume[]> {
        return from (
        this._pouchDb
            .query("query/by-dates", {
                include_docs: true,
                startkey: [volumeParameter.symbol, moment(volumeParameter.from).format('YYYY-MM-DDT00:00:00.000Z')],
                endkey: [volumeParameter.symbol, moment(volumeParameter.to).format('YYYY-MM-DDT23:59:59.999Z')]
            })
            .then(response => {
                console.log(response);
                return response.rows.map(row => {
                    return new Volume({
                        id: row.doc._id,
                        symbol: row.doc.symbol,
                        details: row.doc.details.map(detail => {
                            return new VolumeDetail({
                                brokerCode: detail.code,
                                buyer: new Side({
                                    amount: detail.buyAmount,
                                    volume: detail.buyVolume,
                                    average: detail.buyAverage
                                }),
                                seller: new Side({
                                    amount: detail.sellAmount,
                                    volume: detail.sellVolume,
                                    average: detail.sellAverage
                                }),
                                createdDate: detail.createdDate,
                                netAmount: detail.netAmount,
                                totalValue: detail.totalValue
                            })
                        })
                    });
                })
            })
        );
    }
}