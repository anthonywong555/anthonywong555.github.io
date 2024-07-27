import type { HeatMapInterface, Log } from "$lib/base";
import type { ChessDotComLog, TheWoodpeckMethodLog, ChessLog } from "./types";
import { findLog, getRandomFromArray, combineArrays, generateBaseEngine } from "$lib/util";

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

  async generateValue(): Promise<Array<ChessLog>> {
    const autogenEngine = {
      "name":"Chess",
      "attributes":[
         {
            "name":"dailyPuzzle",
            "type":"object"
         },
         {
            "name":"numberOfExercises",
            "type":"number"
         },
         {
            "name":"numberOfGames",
            "type":"number"
         }
      ],
      "decisions":[
         {
            "conditions":{
               "all":[
                  {
                     "fact":"dailyPuzzle",
                     "operator":"equal",
                     "value":true
                  },
                  {
                     "fact":"numberOfExercises",
                     "operator":"equal",
                     "value":0
                  },
                  {
                     "fact":"numberOfGames",
                     "operator":"equal",
                     "value":0
                  }
               ]
            },
            "event":{
               "type":"yellow",
               "params":{
                  "color":"yellow",
                  "value": 1
               }
            }
         },
         {
            "conditions":{
               "all":[
                  {
                     "fact":"dailyPuzzle",
                     "operator":"equal",
                     "value":true
                  },
                  {
                     "any":[
                        {
                           "fact":"numberOfExercises",
                           "operator":"greaterThan",
                           "value":0
                        },
                        {
                           "fact":"numberOfGames",
                           "operator":"greaterThan",
                           "value":0
                        }
                     ]
                  }
               ]
            },
            "event":{
               "type":"green",
               "params":{
                  "color":"green",
                  "value": 2
               }
            }
         },
         {
            "conditions":{
               "all":[
                  {
                     "fact":"dailyPuzzle",
                     "operator":"equal",
                     "value":true
                  },
                  {
                     "fact":"numberOfExercises",
                     "operator":"greaterThan",
                     "value":0
                  },
                  {
                     "fact":"numberOfGames",
                     "operator":"greaterThan",
                     "value":0
                  }
               ]
            },
            "event":{
               "type":"blue",
               "params":{
                  "color":"blue",
                  "value": 3
               }
            }
         }
      ]
   };

    const engine = generateBaseEngine();

    for(const aCondition of autogenEngine.decisions) {
      engine.addRule(aCondition);  
    }

    const newLogs = [];
    for(const aLog of this.logs) {
      const { events } = await engine.run(aLog);
      const result = events[events.length - 1];
      newLogs.push({...aLog, ...result.params});
    }

    this.logs = newLogs;

    return newLogs;
  }

  generateDomains(): Array<Number> {
    return Array.from(new Set(this.logs.map((aLog) => aLog.value)));
  }

  generateRanges(): Array<string> {
    return Array.from(new Set(this.logs.map((aLog) => aLog.color)));
  }

  toolTip(date: any, value: number, dayjsDate: any, aHeatMap: HeatMapInterface) {
    if(value) {
      return '';
    }
  }
}