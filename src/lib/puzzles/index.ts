import type { HeatMapInterface } from '$lib/base';
import type { PuzzleLog } from './types';
import { findLog, capitalizeFirstLetter, fromCamelCaseToNormalCase } from '$lib/util';

const PUZZLE_DOMAIN = [1, 2, 3];
const PUZZLE_RANGES = ['#14432a', '#166b34', '#37a446', '#4dd05a'];

export default class PuzzleHeatMap implements HeatMapInterface {
  logs: PuzzleLog[];
  logKeys: Array<string>;

  constructor(logs: Array<PuzzleLog>) {
    this.logs = logs;

    const dummyObject:PuzzleLog = {
      date: new Date('2020-20-2'),
      mini: false,
      strands: false,
      connnections: false,
      wordle: false,
      crossword: false,
      notes: ''
    }

    this.logKeys = Object.keys(dummyObject);
  }

  generateValue(): Promise<Array<PuzzleLog>> {
    const newPuzzleLogs = this.logs.map((aLog) => {
      // Count the number of Puzzles has been in progress or completed.
      let value = 0;

      for(const aKey of this.logKeys) {
        if(aLog[aKey]) {
          value = value + 1;
        }
      }

      return {...aLog, value};
    });

    this.logs = newPuzzleLogs;

    return newPuzzleLogs;
  }

  generateDomains():Array<Number> {
    return PUZZLE_DOMAIN;
  }

  generateRanges():Array<string> {
    return PUZZLE_RANGES;
  }

  toolTip(aLog: PuzzleLog) {
    let completedPuzzles = [];
    for(const aKey of this.logKeys) {
      // The `date` field is standard on all logs. 
      // We don't want to see this on the tool tip.
      if(aKey != 'date' && aLog[aKey]) {
        completedPuzzles.push(capitalizeFirstLetter(aKey));
      }
    }

    return completedPuzzles.join(', ');
  }

  getLogInfo(aLog: PuzzleLog) {
    const messages = [];
    for(const aKey of this.logKeys) {
        messages.push(`${fromCamelCaseToNormalCase(aKey)}: ${aLog[aKey]}`);
    }
    return messages.join('<br>');
  }
}