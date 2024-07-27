import csv from "csvtojson";
import {DateTime, Interval} from "luxon";
import { Engine } from 'json-rules-engine';
import type { Log } from "./types";

/**
 * Gets random elements from an arraya
 * @param arr Array
 * @param n Number of Elements
 * @returns Reduce Array with random elements.
 * @source https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
 */
export function getRandomFromArray(arr: Array<any>, n:any) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

/**
 * Normalize a Date object into a formatted strings.
 * @param aDate new Date('07/22/1993');
 * @returns A string of date: '07/22/1993'
 */
export function getDateString(aDate: Date):string {
  return `${aDate.getMonth() + 1}/${aDate.getDate()}/${aDate.getFullYear()}`
}

/**
 * Fetch JSON Data in the Directory
 * @param path Path to the file
 * @returns JSON Blob
 */
export async function fetchJSON(path: string):Promise<any> {
  try {
    return (await (await fetch(path)).json());
  } catch(e) {
    throw e;
  }
}

/**
 * Fetch CSV File and converts it to JSON
 * @param path Path to the CSV File
 * @returns Converted JSON
 */
export async function fetchCSVandConvertToJSON(path: string):Promise<any> {
  try {
    const csvFile = (await (await fetch(path)).text());
    const json = await csv().fromString(csvFile);
    return json;
  } catch (e) {
    throw e;
  }
}

/**
 * Check to see if a target date 
 * @param startDate The start date. If a start date hasn't been supply then it will automatically set as 07/01/2024.
 * @param endDate The end date. If a end date hasn't been supply then it will automatically set as 07/01/2070.
 * @param targetDate The date you want to test against.
 * @returns True or False
 */
export function withinDatesRange(startDate: Date = new Date('07/01/2024'), endDate: Date = new Date('07/01/2070'), targetDate: Date | DateTime):Boolean {
  const anInterval = Interval.fromDateTimes(startDate, endDate);
  const targetDateTime = targetDate instanceof Date ? DateTime.fromJSDate(targetDate) : targetDate;
  return anInterval.contains(targetDateTime);
}

/**
 * Generate a Baseline Engine.
 * @returns Engine
 */
export function generateBaseEngine():Engine {
  const engine = new Engine();
  engine.addOperator('withinDatesRange', (factValue, dateRanges: Date[][]) => {
    let result = false;

    if(factValue && factValue.date) {
      const { date } = factValue;
      for(const dateRange of dateRanges) {
        const startDate = dateRange[0];
        const endDate = dateRange[1];
        if(withinDatesRange(startDate, endDate, date)) {
          result = true;
          break;
        }
      }
    }

    return result;
  });

  return engine;
}