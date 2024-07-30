import type { RuleProperties } from "json-rules-engine";

export interface HeatMapInterface {
  logs?: Log[];
  logKeys?: string[];

  /**
   * Generate a the JSON Rules for the Engine.
   */
  generateJSONRulesEngine?():Array<RuleProperties>;

  /**
   * Generate value for the Heatmap.
   * Think of it as what is the scoring of each log.
   * SideEffect: It will mutant the inital date with adding a value.
   * @param logs 
   */
  generateValue?(): Promise<Array<Log>>

  /**
   * Generate Domains for a Heatmap.
   * It's a set of scoring from the generateValue
   * @param logs 
   */
  generateDomains():Array<Number>;

  /**
   * Generate Range for a Heatmap.
   * Think of it a color corresponding to the value.
   * @param logs 
   */
  generateRanges():Array<string>;

  /**
   * Used for the HeatMap's Tooltip.
   * @param date Epoch of the Square
   * @param value Value of the Square
   * @param dayjsDate Date of the Square
   * @param aHeatMap The instance of the HeatMap
   */
  toolTip(aLog: Log):string;

  getCalendarLabel():any;
}

export interface Log {
  date: Date;
  value: number;
  notes?: string;
}