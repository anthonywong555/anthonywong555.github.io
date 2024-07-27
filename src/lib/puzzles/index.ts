import type { HeatMapInterface } from '../base';
import type { PuzzleLog } from './types';
import { findLog, capitalizeFirstLetter } from '../util';

const PUZZLE_DOMAIN = [1, 2, 3];
const PUZZLE_RANGES = ['#14432a', '#166b34', '#37a446', '#4dd05a'];

export class PuzzleHeatMap implements HeatMapInterface {
  logs: Array<PuzzleLog>;
  logKeys: Array<string>;

  constructor(logs: Array<PuzzleLog>) {
    this.logs = logs;

    if(logs.length > 0) {
      const keys = Object.keys(this.logs[0]);
      this.logKeys = keys;
    }
  }

  generateValue(): Array<PuzzleLog> {
    const newPuzzleLogs = this.logs.map((aLog) => {
      // Count the number of Puzzles has been in progress or completed.
      let value = 0;

      for(const aKey of this.logKeys) {
        if(aLog[aKey] == 'true') {
          value = value + 1;
        }
      }

      return {...aLog, value};
    });

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
      const aLog = findLog(new Date(dayjsDate), aHeatMap.logs);

      if(aLog) {
        // Get a list of items that has the value 'true'.
        let completedPuzzles = [];
        for(const aKey of aHeatMap.logKeys) {
          if(aLog[aKey] == 'true') {
            completedPuzzles.push(capitalizeFirstLetter(aKey));
          }
        }

        return completedPuzzles.join(', ');
      }
    }
    return '';
  }
}