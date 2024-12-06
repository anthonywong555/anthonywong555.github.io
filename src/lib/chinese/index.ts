import type { HeatMapInterface } from '$lib/base';
import type { ChineseLog } from './types';
import { findLog, capitalizeFirstLetter, fromCamelCaseToNormalCase, removeIs } from '$lib/util';

const CHINESE_DOMAIN = [1, 2];
const CHIENSE_RANGES = ['red', 'yellow', 'green'];

export default class PuzzleHeatMap implements HeatMapInterface {
  logs: ChineseLog[];
  logKeys: Array<string>;

  constructor(logs: Array<ChineseLog>) {
    this.logs = logs;

    const dummyObject:ChineseLog = {
      date: new Date('2020-20-2'),
      isReview: false,
      isLearn: false,
      notes: ''
    }

    this.logKeys = Object.keys(dummyObject);
  }

  generateValue(): Promise<Array<ChineseLog>> {
    const newChineseLogs = this.logs.map((aLog) => {
      // Count the number of Puzzles has been in progress or completed.
      let value = 0;

      for(const aKey of this.logKeys) {
        if(aLog[aKey] && aKey != 'notes' && aKey != 'date') {
          value = value + 1;
        }
      }

      return {...aLog, value};
    });

    this.logs = newChineseLogs;

    return newChineseLogs;
  }

  generateDomains():Array<Number> {
    return CHINESE_DOMAIN;
  }

  generateRanges():Array<string> {
    return CHIENSE_RANGES;
  }

  toolTip(aLog: ChineseLog) {
    let completedPuzzles = [];
    for(const aKey of this.logKeys) {
      // The `date` field is standard on all logs. 
      // We don't want to see this on the tool tip.
      if(aKey != 'date' && aKey != 'value' && aLog[aKey] && aKey != 'notes') {
        completedPuzzles.push(capitalizeFirstLetter(removeIs(aKey)));
      }
    }

    return completedPuzzles.join(', ');
  }

  getLogInfo(aLog: ChineseLog) {
    const messages = [];
    
    for(const aKey of this.logKeys) {
      if(aKey != 'value' && aLog[aKey]) {
          messages.push(`${fromCamelCaseToNormalCase(removeIs(aKey))}: ${aLog[aKey]}`);
      }
    }

    return messages.join('<br>');
  }
}