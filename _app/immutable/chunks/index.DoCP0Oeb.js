import{c as i,a as c,f as l,C as p}from"./2.DDyGHb2Y.js";const u={name:"Chess",attributes:[{name:"dailyPuzzle",type:"object"},{name:"numberOfGames",type:"number"},{name:"studying",type:"object"},{name:"numberOfExercises",type:"number"}],decisions:[{conditions:{all:[{fact:"dailyPuzzle",operator:"equal",value:!0},{fact:"studying",operator:"equal",value:!0},{fact:"numberOfExercises",operator:"greaterThan",value:0},{fact:"numberOfGames",operator:"greaterThan",value:0},{fact:"date",operator:"withinDatesRange",value:["2024-07-01",new Date().toISOString()]}]},event:{type:"purple",params:{color:"purple",value:4}}},{conditions:{all:[{fact:"dailyPuzzle",operator:"equal",value:!0},{any:[{fact:"studying",operator:"equal",value:!0},{fact:"numberOfExercises",operator:"greaterThan",value:0}]},{fact:"numberOfGames",operator:"greaterThan",value:0},{fact:"date",operator:"withinDatesRange",value:["2024-07-01",new Date().toISOString()]}]},event:{type:"blue",params:{color:"blue",value:3}}},{conditions:{all:[{fact:"dailyPuzzle",operator:"equal",value:!0},{fact:"numberOfGames",operator:"greaterThan",value:0},{fact:"date",operator:"withinDatesRange",value:["2024-07-01",new Date().toISOString()]}]},event:{type:"green",params:{color:"green",value:2}}},{conditions:{all:[{fact:"dailyPuzzle",operator:"equal",value:!0},{any:[{fact:"numberOfExercises",operator:"greaterThan",value:0},{fact:"numberOfGames",operator:"greaterThan",value:0},{fact:"studying",operator:"greaterThan",value:!0}]},{fact:"date",operator:"withinDatesRange",value:["2024-07-01",new Date().toISOString()]}]},event:{type:"yellow",params:{color:"yellow",value:1}}},{conditions:{all:[{any:[{fact:"dailyPuzzle",operator:"equal",value:!0},{fact:"numberOfExercises",operator:"greaterThan",value:0},{fact:"numberOfGames",operator:"greaterThan",value:0},{fact:"studying",operator:"greaterThan",value:!0}]},{fact:"date",operator:"withinDatesRange",value:["2024-07-01",new Date().toISOString()]}]},event:{type:"pink",params:{color:"pink",value:-1}}}]};class g{constructor(a,t){this.chessDotComLogs=a,this.woodpeckerLogs=t;const e={date:new Date("2020-20-2"),dailyPuzzle:!1,numberOfExercises:0,numberOfGames:0,value:0,studying:!1,notes:""},s=Object.keys(e);this.logKeys=s;let o=i(a,t,"date");o=o.map(r=>{for(const n of this.logKeys)(!Object.hasOwn(r,n)||r[n]=="")&&(r[n]=e[n]);return r}),this.logs=o}async generateValue(){const a=c();for(const e of u.decisions)a.addRule(e);const t=[];for(const e of this.logs){const{events:s}=await a.run(e),o=s.reduce((r,n)=>n.params.value>r.params.value?n:r);t.push({...e,...o.params})}return this.logs=t,t}generateDomains(){return Array.from(new Set(u.decisions.map(a=>a.event.params.value)))}generateRanges(){return Array.from(new Set(u.decisions.map(a=>a.event.params.color)))}toolTip(a){let t=[];for(const e of this.logKeys)e!="date"&&e!="value"&&e!="description"&&(a[e]==!0&&a||a[e]>0)&&(e==="dailyPuzzle"||e==="studying"?t.push(`${l(e)}`):t.push(`${l(e)}: ${a[e]}`));return t.join(", ")}getLogInfo(a){const t=[];for(const e of this.logKeys)e!="value"&&t.push(`${l(e)}: ${a[e]}`);return t.join("<br>")}getCalendarLabel(){return[p,{position:"top",key:"chess-heatmap",text:()=>["Road to 1600"],width:430,textAlign:"middle",padding:[0,0,5,0]}]}}export{g as default};