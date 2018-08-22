import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Injectable } from "@angular/core";
import { isNumeric } from 'rxjs/util/isNumeric'

@Injectable()
export class NgbDateLongParserFormatter extends NgbDateParserFormatter {

    /**
     * 
     * @param {string} value
     * @returns {NgbDateStruct}
     */
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('/');
            
            if (dateParts.length === 1 && isNumeric(dateParts[0])) {
                return {year: Number(dateParts[0]), month: null, day: null};
            } else if (dateParts.length === 2 && isNumeric(dateParts[0]) && isNumeric(dateParts[1])) {
                return {year: Number(dateParts[1]), month: Number(dateParts[0]), day: null};
            } else if (dateParts.length === 3 && isNumeric(dateParts[0]) && isNumeric(dateParts[1]) && isNumeric(dateParts[2])) {
                return {year: Number(dateParts[2]), month: Number(dateParts[1]), day: Number(dateParts[0])};
            }
        }
        return null;
    }

    /**
     * 
     * @param {NgbDateStruct} date
     * @returns {string}
     */
    format(date: NgbDateStruct): string {
        if (!date) return '';
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let newDate = new Date(date.year, date.month - 1, date.day);
        return newDate.toLocaleDateString("en-US", options);
    }
}