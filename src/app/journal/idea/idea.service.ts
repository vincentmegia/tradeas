import { Injectable } from '@angular/core';
import { Idea } from './idea';
import PouchDB from 'pouchdb';

@Injectable()
export class IdeaService {
    private _pouchDb: PouchDB;

    constructor() {
        this._pouchDb = new PouchDB('http://localhost:5984/tradeas');
    }
    /**
     * Gets all Ideas based on date range
     */
    addIdea(idea: Idea): void {
        let response = this._pouchDb.put(idea);
    }

    /**
     * 
     */
    getAll(): Idea[] {
        debugger;
        this._pouchDb.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {
            console.log(result);
        }).catch(function (err) {
            console.log(err);
        });
        return new Idea[0];
    }
}