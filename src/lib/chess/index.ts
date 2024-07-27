import type { HeatMapInterface, Log } from "$lib/base";
import type { ChessDotComLog, TheWoodpeckMethodLog, ChessLog } from "./types";
import { findLog, getRandomFromArray, combineArrays } from "$lib/util";

export default class ChessHeatMap implements HeatMapInterface {
  chessDotComLogs: ChessDotComLog[];
  woodpeckerLogs: TheWoodpeckMethodLog[];
  logs: ChessLog[];
  logKeys: Array<string>;

  constructor(chessDotComLogs: ChessDotComLog[], woodpeckerLogs: TheWoodpeckMethodLog[]) {
    this.chessDotComLogs = chessDotComLogs;
    this.woodpeckerLogs = woodpeckerLogs;

    // Combine the logs in to one.
    const result = combineArrays(chessDotComLogs, woodpeckerLogs, 'date');
    this.logs = result;

    if(this.logs.length > 0) {
      const keys = Object.keys(this.logs[0]);
      this.logKeys = keys;
    }
  }

  generateValue(): Array<Log> {
    return [];
  }

  generateDomains(): Array<Number> {
    return [];
  }

  generateRanges(): Array<string> {
    return [];
  }

  toolTip(date: any, value: number, dayjsDate: any, aHeatMap: HeatMapInterface) {
    if(value) {
      return '';
    }
  }
}