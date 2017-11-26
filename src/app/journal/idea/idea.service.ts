import { Injectable } from '@angular/core';
import { Idea } from './idea';
import * as PouchDB from 'pouchdb';

@Injectable()
export class IdeaService {

    /**
     * Gets all Ideas based on date range
     */
    addIdea(idea: Idea): void {
        debugger;
        let pouchDb = new PouchDB('tradeas', {adapter: 'memory'});
        let response = pouchDb.put(idea);
    }
}