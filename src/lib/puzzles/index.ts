import type { HeatMapInterface } from '../base';
import type { PuzzleLog } from './types';

export class PuzzleHeatMap implements HeatMapInterface {
  /**
   * Class Methods
   */


  generateValue(logs: Array<PuzzleLog>): Array<PuzzleLog> {
    return PuzzleHeatMap.generateValue(logs);
  }

  generateDomains(logs: Array<PuzzleLog>):Array<Number> {
    return PuzzleHeatMap.generateDomains(logs);
  }

  generateRanges(logs: Array<PuzzleLog>):Array<string> {
    return PuzzleHeatMap.generateRanges(logs);
  }

  /**
   * Static Methods
   */
  static generateValue(logs: Array<PuzzleLog>): Array<PuzzleLog> {
    const newPuzzleLog = logs.map((aLog) => {
      // Add Rules
      const { mini, strands, connnections, wordle, crossword } = aLog;

      if(mini || strands || connnections || wordle || crossword) {
        
      }
    });
    return 
  }
  
  /**
   * Return Domain for a heatmap.
   * @param logs 
   * @returns 
   */
  static generateDomains(logs: Array<PuzzleLog>):Array<Number> {
    return [];
  }

  static generateRanges(logs: Array<PuzzleLog>):Array<string> {
    return [];
  }
}