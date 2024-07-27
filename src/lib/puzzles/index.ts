import type { HeatMapInterface } from '$lib/base';
import type { PuzzleLog } from './types';
import { findLog, capitalizeFirstLetter } from '$lib/util';

const PUZZLE_DOMAIN = [1, 2, 3];
const PUZZLE_RANGES = ['#14432a', '#166b34', '#37a446', '#4dd05a'];

export default class PuzzleHeatMap implements HeatMapInterface {
  logs: PuzzleLog[];
  logKeys: Array<string>;

  constructor(logs: Array<PuzzleLog>) {
    this.logs = logs;

    if(logs.length > 0) {
      const keys = Object.keys(this.logs[0]);
      this.logKeys = keys;
    }
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

  toolTip(date:any, value: number, dayjsDate: any, aHeatMap: HeatMapInterface) {
    if(value) {
      const aLog:PuzzleLog = findLog(new Date(dayjsDate), aHeatMap.logs);

      if(aLog) {
        // Get a list of items that has the value 'true'.
        let completedPuzzles = [];
        for(const aKey of aHeatMap.logKeys) {
          // The `date` field is standard on all logs. 
          // We don't want to see this on the tool tip.
          if(aKey != 'date' && aLog[aKey]) {
            completedPuzzles.push(capitalizeFirstLetter(aKey));
          }
        }

        return completedPuzzles.join(', ');
      }
    }
    return '';
  }
}