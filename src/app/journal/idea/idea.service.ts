import { Injectable } from '@angular/core';
import { Idea } from './idea';
import PouchDB from 'pouchdb';
import { ConfigurationService } from "../../shared/services/configuration.service";

@Injectable()
export class IdeaService {
    private _pouchDb: PouchDB;

    constructor(private configurationService: ConfigurationService) {
        let url = configurationService.items["couchdbUrl"];
        this._pouchDb = new PouchDB(url + 'journal');
    }

    /**
     * Gets all Ideas based on date range
     */
    addIdea(idea: Idea): void {
        let ideaJson = idea.json;
        let response = this._pouchDb.put(ideaJson);
    }
}