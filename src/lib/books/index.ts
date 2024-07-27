import type { Log } from './types';
import { getRandomFromArray } from '../util';

const PASTEL_COLOR = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"];

interface LogWithValue extends Log {
  value: number;
}

/**
 * Take the intial log and append a 'value' attribute.
 */
export function generateValue(logs: Array<Log>): Array<LogWithValue> {
  const bookTitles = Array.from(new Set(logs.map((aLog) => aLog.title)));
  const logsWithValues = logs.map((aBookEntry) => {
    // The Reason why you +1 is because when you do the tool tip. It does the check
    // against the value. In this case it would be the titleId
    return {...aBookEntry, value: bookTitles.indexOf(aBookEntry.title) + 1};
  });

  return logsWithValues;
}

/**
 * Generate Domains for Heatmap.
 * @param logs Logs
 * @returns Array of Numbers
 */
export function generateDomains(logs: Array<LogWithValue>):Array<Number> {
  return Array.from(new Set(logs.map((aLog) => Number(aLog.value))));
}

/**
 * Generate Ranges for Heatmap.
 * @param logs Logs
 * @returns Array of strings.
 */
export function generateRanges(logs: Array<LogWithValue>):Array<string> {
  return getRandomFromArray(PASTEL_COLOR, logs.length);
}