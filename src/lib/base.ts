import type { RuleProperties } from "json-rules-engine";

export interface HeatMapInterface {
  logs: Log[];
  logKeys: string[];

  /**
   * Generate a the JSON Rules for the Engine.
   */
  generateJSONRulesEngine?():Array<RuleProperties>;

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

  /**
   * Used for the HeatMap's Tooltip.
   * @param date Epoch of the Square
   * @param value Value of the Square
   * @param dayjsDate Date of the Square
   * @param aHeatMap The instance of the HeatMap
   */
  toolTip(date:any, value: number, dayjsDate: any, aHeatMap: HeatMapInterface);
}

export interface Log {
  date: Date;
  key: string;
}

export interface Array<Log> {}