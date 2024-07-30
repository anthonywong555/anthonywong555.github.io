<script lang="ts">
  import "cal-heatmap/cal-heatmap.css";
  import CalHeatmap from 'cal-heatmap';
  import Tooltip from 'cal-heatmap/plugins/Tooltip';
  import CalendarLabel from 'cal-heatmap/plugins/CalendarLabel';
	import { onMount } from "svelte";
  import { fetchCSVandConvertToJSON, findLog } from "$lib/util";
  
  /**
   * Constants
   */
  const START_DATE = new Date('07/01/2024');
  const RANGE = 6;

  let heatMaps = [];

  onMount(async() => {
    try {
      // Fetch Configurations.
      const testConfigs = [
        {
          'id': 'books',
          'title': '📚 Books 🛋️',
          'heatMap': 'books',
          'scaleType': 'threshold',
          'sources': ['/data/books/entries.csv'],
          'cellInfo': '',
        },
        {
          'id': 'chess',
          'title': '♘ Chess ♞',
          'heatMap': 'chess',
          'scaleType': 'ordinal',
          'sources': ['/data/chess/ChessDotCom.csv', '/data/chess/TheWoodpeckerMethod.csv'],
          'cellInfo': '',
        },
        {
          'id': 'puzzles',
          'title': '🧩🔠 NYT - Puzzles ✍🏁',
          'heatMap': `puzzles`,
          'scaleType': 'threshold',
          'sources': [`/data/puzzles/NYT.csv`],
          'cellInfo': ''
        },
      ];

      // Iterate over the Congrations
      for(const aConfig of testConfigs) {
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
          const logs = await heatMap.generateValue();
          const domains = heatMap.generateDomains();
          const ranges = heatMap.generateRanges();

          // Generate the HTML
          heatMaps = [...heatMaps, {...aConfig}];
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
              type: aConfig.scaleType,
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
                  if(value) {
                    const aLog = (findLog(new Date(dayjsDate), heatMap.logs));
                    const toolTip = heatMap.toolTip(aLog);
                    const logInfo = heatMap.getLogInfo(aLog);

                    heatMaps = heatMaps.map((aHeatMap) => {
                      if(aHeatMap.id === aConfig.id) {
                        aHeatMap.cellInfo = logInfo;
                      }
                      return aHeatMap;
                    });
                    
                    return toolTip;
                  }

                  return '';
                },
              },
            ],
            ...(typeof heatMap.getCalendarLabel != 'undefined' ?
              [heatMap.getCalendarLabel()] : []
            )
          ]);
        }
      }
    } catch(e) {
      console.log(e);
    }
  });
</script>

<h1>Anthony Wong's Habit Tracker</h1>

<div id="heatMaps">
  {#each heatMaps as aHeatMap}
        <h1>{aHeatMap.title}</h1>
    <div id={aHeatMap.id} style="display: flex;">
      <div class="heatmap">
        <div id={`${aHeatMap.id}-heatmap`}></div>
      </div>
      <div id={`${aHeatMap.id}-log-info`} class="logInfo">
        {@html aHeatMap.cellInfo}
      </div>
    </div>
  {/each}
</div>

<!--<a href="{base}/about">About</a>-->