import type { HeatMapInterface } from "$lib/base";
import type { BookLog } from "./types";
import { findLog, fromCamelCaseToNormalCase, getRandomFromArray } from "$lib/util";

const PASTEL_COLOR = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"];

export default class BookHeatMap implements HeatMapInterface {
  logs: BookLog[];
  logKeys: string[];

  constructor(logs: BookLog[]) {
    this.logs = logs;

    if(logs.length > 0) {
      this.logKeys = Object.keys(this.logs[0]);
    }
  }

  generateValue(): Promise<Array<BookLog>> {
    const bookTitles = Array.from(new Set(this.logs.map((aLog) => aLog.title)));
    const logsWithValues = this.logs.map((aBookEntry) => {
      // The Reason why you +1 is because when you do the tool tip. It does the check
      // against the value. In this case it would be the titleId
      return {...aBookEntry, value: bookTitles.indexOf(aBookEntry.title) + 1};
    });

    this.logs = logsWithValues;

    return logsWithValues;
  }

  generateDomains(): Array<Number> {
    return Array.from(new Set(this.logs.map((aLog) => Number(aLog.value))));
  }

  generateRanges(): Array<string> {
    return getRandomFromArray(PASTEL_COLOR, this.logs.length);
  }

  toolTip(aLog: BookLog) {
    return `${aLog.title} - Pages: ${aLog.pages}`;
  }

  getCellInfo(aLog: BookLog) {
    const messages = [];
    for(const aKey of this.logKeys) {
        messages.push(`${fromCamelCaseToNormalCase(aKey)}: ${aLog[aKey]}`);
    }
    return messages.join('<br>');
  }

  getCalendarLabel():any {
    return null;
  }
}