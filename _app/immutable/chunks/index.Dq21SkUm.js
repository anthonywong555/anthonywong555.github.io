import{f as l,d as i}from"./2.BHM-eX3V.js";const g=[1,2,3],u=["#14432a","#166b34","#37a446","#4dd05a"];class d{constructor(e){if(this.logs=e,e.length>0){const t=Object.keys(this.logs[0]);this.logKeys=t}}generateValue(){const e=this.logs.map(t=>{let s=0;for(const o of this.logKeys)t[o]&&(s=s+1);return{...t,value:s}});return this.logs=e,e}generateDomains(){return g}generateRanges(){return u}toolTip(e,t,s,o){if(t){const r=l(new Date(s),o.logs);if(r){let a=[];for(const n of o.logKeys)n!="date"&&r[n]&&a.push(i(n));return a.join(", ")}}return""}}export{d as default};
