import csv from "csvtojson";

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