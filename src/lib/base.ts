export interface HeatMapInterface {

  /**
   * Generate value for the Heatmap.
   * Think of it as what is the scoring of each log.
   * 
   * @param logs 
   */
  generateValue(logs: Array<Log>): Array<Log>

  /**
   * Generate Domains for a Heatmap.
   * It's a set of scoring from the generateValue
   * @param logs 
   */
  generateDomains(logs: Array<Log>):Array<Number>;

  /**
   * Generate Range for a Heatmap.
   * Think of it a color corresponding to the value.
   * @param logs 
   */
  generateRanges(logs: Array<Log>):Array<string>;
}

export interface Log {
  date: Date;
  key: string;
}

export interface Array<Log> {}