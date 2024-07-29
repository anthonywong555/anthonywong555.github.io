import type { HeatMapInterface, Log } from "$lib/base";
import type { ChessDotComLog, TheWoodpeckerMethodLog, ChessLog } from "./types";
import { findLog, combineArrays, generateBaseEngine, fromCamelCaseToNormalCase } from "$lib/util";

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
                  "operator":"greaterThan",
                  "value":0
               },
               {
                  "fact":"numberOfGames",
                  "operator":"greaterThan",
                  "value":0
               },
               {
                  "fact":"date",
                  "operator":"withinDatesRange",
                  "value":['2024-07-01', (new Date()).toISOString()]
               },
            ]
         },
         "event":{
            "type":"blue",
            "params":{
               "color":"blue",
               "value": 3
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
                  "operator":"equal",
                  "value":0
               },
               {
                  "fact":"numberOfGames",
                  "operator":"equal",
                  "value":0
               },
               {
                  "fact":"date",
                  "operator":"withinDatesRange",
                  "value":['2024-07-01', (new Date()).toISOString()]
               },
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
                  "fact":"numberOfGames",
                  "operator":"greaterThan",
                  "value":0
               },
               {
                  "fact":"date",
                  "operator":"withinDatesRange",
                  "value":['2024-07-01', (new Date()).toISOString()]
               },
            ]
         },
         "event":{
            "type":"green",
            "params":{
               "color":"green",
               "value": 2
            }
         }
      }
   ]
};

export default class ChessHeatMap implements HeatMapInterface {
   chessDotComLogs: ChessDotComLog[];
   woodpeckerLogs: TheWoodpeckerMethodLog[];
   logs: ChessLog[];
   logKeys: Array<string>;

   constructor(chessDotComLogs: ChessDotComLog[], woodpeckerLogs: TheWoodpeckerMethodLog[]) {
      this.chessDotComLogs = chessDotComLogs;
      this.woodpeckerLogs = woodpeckerLogs;

      // Create a Dummy Object to generate a Logs Keys
      // This is super helpful when rendering out information.
      const dummyObject:ChessLog = {
         date: new Date('2020-20-2'),
         dailyPuzzle: false,
         numberOfExercises: 0,
         numberOfGames: 0,
         value: 0,
         studying: false,
         notes: '',
      };

      const keys = Object.keys(dummyObject);
      this.logKeys = keys;

      // Combine the logs in to one.
      let result = combineArrays(chessDotComLogs, woodpeckerLogs, 'date');

      // Set Default Values due to JSON Rules Engine.
      result = result.map((aLog) => {
         for(const aKey of this.logKeys) {
            if(!Object.hasOwn(aLog, aKey)) {
               aLog[aKey] = dummyObject[aKey];
            }
         }
         return aLog;
      });

      this.logs = result;
   }

   async generateValue(): Promise<Array<ChessLog>> {
      const engine = generateBaseEngine();

      for(const aCondition of autogenEngine.decisions) {
         engine.addRule(aCondition);  
      }

      const newLogs = [];
      for(const aLog of this.logs) {
         const { events } = await engine.run(aLog);
         const result = events[0];
         newLogs.push({...aLog, ...result.params});
      }

      this.logs = newLogs;

      return newLogs;
   }

   generateDomains(): Array<Number> {
      return Array.from(new Set(autogenEngine.decisions.map((aDecision) => aDecision.event.params.value)));
   }

   generateRanges(): Array<string> {
      return Array.from(new Set(autogenEngine.decisions.map((aDecision) => aDecision.event.params.color)));
   }

   toolTip(aLog: ChessLog): string {
      let messages = [];

      for(const aKey of this.logKeys) {
         if(aKey != 'date' && aKey != 'value' && aKey != 'description' && (aLog[aKey] == true && aLog || aLog[aKey] > 0)) {
            messages.push(`${fromCamelCaseToNormalCase(aKey)}: ${aLog[aKey]}`);
         }
      }

      return messages.join('.\n');
   }

   getCellInfo(aLog: ChessLog):string {
      const messages = [];

      for(const aKey of this.logKeys) {
         messages.push(`${fromCamelCaseToNormalCase(aKey)}: ${aLog[aKey]}`); 
      }

      return messages.join('<br>');
   }
}