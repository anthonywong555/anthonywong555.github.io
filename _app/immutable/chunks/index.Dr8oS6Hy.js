import{g as r}from"./2.DY2bEO7I.js";const n=["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"];function u(e){const t=Array.from(new Set(e.map(a=>a.title)));return e.map(a=>({...a,value:t.indexOf(a.title)+1}))}function i(e){return Array.from(new Set(e.map(t=>Number(t.value))))}function m(e){return r(n,e.length)}export{i as generateDomains,m as generateRanges,u as generateValue};
