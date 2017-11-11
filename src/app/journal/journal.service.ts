import { Injectable } from '@angular/core';
import { Idea } from './idea';
import { JournalMockData } from './journa-mock-data';

@Injectable()
export class JournalService {

    /**
     * Gets all Ideas based on date range
     */
    getIdeas(from: Date, to: Date): Idea[] {
        console.log(JournalMockData.IDEAS);
        return JournalMockData.IDEAS;
    }
}