import{f as l,c as i}from"./2.DY2bEO7I.js";const u=[1,2,3],c=["#14432a","#166b34","#37a446","#4dd05a"];class z{constructor(s){if(this.logs=s,s.length>0){const e=Object.keys(this.logs[0]);this.logKeys=e}}generateValue(){return this.logs.map(e=>{let t=0;for(const o of this.logKeys)e[o]=="true"&&(t=t+1);return{...e,value:t}})}generateDomains(){return u}generateRanges(){return c}toolTip(s,e,t,o){if(e){const r=l(new Date(t),o.logs);if(r){let n=[];for(const a of o.logKeys)r[a]=="true"&&n.push(i(a));return n.join(", ")}}return""}}export{z as default};