<script lang="ts">
  import "cal-heatmap/cal-heatmap.css";
  import CalHeatmap from 'cal-heatmap';
  import Tooltip from 'cal-heatmap/plugins/Tooltip';
	import { onMount } from "svelte";
  import { fetchCSVandConvertToJSON } from "$lib/util";
  
  /**
   * Constants
   */
  const START_DATE = new Date('07/01/2024');
  const RANGE = 6;

  $: heatmaps = [];

  onMount(async() => {
    try {
      // Fetch Configurations.
      const testConfigs = [
        {
          'id': 'books',
          'title': '📚 Books 🛋️',
          'heatMap': 'books',
          'sources': ['/data/books/entries.csv']
        },
        {
          'id': 'chess',
          'title': '♘ Chess ♞',
          'heatMap': 'chess',
          'sources': ['/data/chess/ChessDotCom.csv', '/data/chess/TheWoodpeckerMethod.csv']
        },
        {
          'id': 'puzzles',
          'title': '🧩🔠 Puzzles ✍🏁',
          'heatMap': `puzzles`,
          'sources': [`/data/puzzles/NYT.csv`]
        },
      ];
      
      // Iterate over the Congrations
      for(const aConfig of testConfigs) {
        console.log('aConfig', aConfig);
        const dynamicImport = await import(`../lib/${aConfig.heatMap}/index.ts`);
        
        // Check to see if there's a default export.
        if(dynamicImport.default) {
          // Generate the heatmap.
          const heatMapClass = dynamicImport.default;

          const targetCSVs = [];
          for(const aSource of aConfig.sources) {
            const targetCSV = await fetchCSVandConvertToJSON(aSource);
            targetCSVs.push(targetCSV);
          }

          //const targetCSV = await fetchCSVandConvertToJSON([...targetCSVs]);
          const heatMap = new heatMapClass(...targetCSVs);
          const logs = heatMap.generateValue();
          const domains = heatMap.generateDomains();
          const ranges = heatMap.generateRanges();

          // Generate the HTML
          heatmaps = [...heatmaps, {...aConfig}];
          new CalHeatmap().paint({
            data: {
              source: logs,
              x: 'date',
              y: d => +d['value'],
            },
            date: { start: START_DATE },
          range: RANGE,
          itemSelector: `#${aConfig.id}-heatmap`,
          scale: {
            color: {
              type: 'threshold',
              domain: domains,
              range: ranges,
            },
          },
          domain: { type: 'month' },
          subDomain: {
            width: 15,
            height: 15,
            type: 'day',
            label: null,
            color: '#FFF',
          }
          }, 
          [
            [
              Tooltip,
              {
                text: (date, value, dayjsDate) => {
                  return heatMap.toolTip(date, value, dayjsDate, heatMap);
                },
              },
            ]
          ]);
        }
      }
    } catch(e) {
      console.log(e);
    }
  });
</script>

<h1>Anthony Wong's Habit Tracker</h1>

<div id="heatmaps">
  {#each heatmaps as aHeatMap}
    <div id={aHeatMap.id}>
      <h1>{aHeatMap.title}</h1>
      <div id={`${aHeatMap.id}-heatmap`}></div>
    </div>
  {/each}
</div>

<!--<a href="{base}/about">About</a>-->