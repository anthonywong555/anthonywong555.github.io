import type { HeatMapInterface } from '../base';
import type { PuzzleLog } from './types';
import type { RuleProperties } from 'json-rules-engine';
import { Engine } from 'json-rules-engine';

export class PuzzleHeatMap implements HeatMapInterface {
  /**
   * Class Methods
   */
  generateJSONRulesEngine():RuleProperties {
    return PuzzleHeatMap.generateJSONRulesEngine();
  }

  generateValue(logs: Array<PuzzleLog>): Array<PuzzleLog> {
    return PuzzleHeatMap.generateValue(logs);
  }

  generateDomains(logs: Array<PuzzleLog>):Array<Number> {
    return PuzzleHeatMap.generateDomains(logs);
  }

  generateRanges(logs: Array<PuzzleLog>):Array<string> {
    return PuzzleHeatMap.generateRanges(logs);
  }

static generateJSONRulesEngine():RuleProperties {
  
  return ;
}

  /**
   * Static Methods
   */
  static generateValue(logs: Array<PuzzleLog>): Array<PuzzleLog> {
    const engine = new Engine();

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