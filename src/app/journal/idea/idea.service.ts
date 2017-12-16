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
        var ideaJson = idea.json;
        let response = this._pouchDb.put(ideaJson);
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