import type { HeatMapInterface, Log } from "$lib/base";
import type { ChessDotComLog, TheWoodpeckerMethodLog, ChessLog } from "./types";
import CalendarLabel from 'cal-heatmap/plugins/CalendarLabel';
import { findLog, combineArrays, generateBaseEngine, fromCamelCaseToNormalCase } from "$lib/util";

const autogenEngine = {
   "name":"Chess",
   "attributes":[
      // ChessDotComLog
      {
         "name":"dailyPuzzle",
         "type":"object"
      },
      {
         "name":"numberOfGames",
         "type":"number"
      },
      {
         "name":"studying",
         "type":"object"
      },
      // TheWoodpeckerMethodLog
      {
         "name":"numberOfExercises",
         "type":"number"
      },
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
                  "fact":"studying",
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
            "type":"purple",
            "params":{
               "color":"purple",
               "value": 4
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
                  "any": [
                     {
                        "fact":"studying",
                        "operator":"equal",
                        "value":true
                     },
                     {
                        "fact":"numberOfExercises",
                        "operator":"greaterThan",
                        "value":0
                     }
                  ]
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
                  "any": [
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
                        "fact":"studying",
                        "operator":"greaterThan",
                        "value":true
                     }
                  ]
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
                  "any": [
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
                        "fact":"studying",
                        "operator":"greaterThan",
                        "value":true
                     }
                  ]
               },
               {
                  "fact":"date",
                  "operator":"withinDatesRange",
                  "value":['2024-07-01', (new Date()).toISOString()]
               },
            ]
         },
         "event":{
            "type":"pink",
            "params":{
               "color":"pink",
               "value": -1 // Catch all. (It can't be zero due to the tooltip.)
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
            if(!Object.hasOwn(aLog, aKey) || aLog[aKey] == '') {
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

         // Find the highist value 
         const highestEvent = events.reduce((prev, current) => {
            return (current.params.value > prev.params.value) ? current : prev;
         });
         
         //const result = events[0];
         newLogs.push({...aLog, ...highestEvent.params});
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
            if(aKey === 'dailyPuzzle' || aKey === 'studying') {
               messages.push(`${fromCamelCaseToNormalCase(aKey)}`);
            } else {
               messages.push(`${fromCamelCaseToNormalCase(aKey)}: ${aLog[aKey]}`); 
            }
         }
      }

      return messages.join(', ');
   }

   getLogInfo(aLog: ChessLog):string {
      const messages = [];

      for(const aKey of this.logKeys) {
         if(aKey != 'value' && aLog[aKey]) {
            messages.push(`${fromCamelCaseToNormalCase(aKey)}: ${aLog[aKey]}`); 
         }
      }

      return messages.join('<br>');
   }

   getCalendarLabel():any {
      return  [ CalendarLabel, {
         position: 'top',
         key: 'chess-heatmap',
         text: () => ['Road to 1600'],
         width: 430,
         textAlign: 'middle',
         padding: [0, 0, 5, 0],
      }];
   }
}