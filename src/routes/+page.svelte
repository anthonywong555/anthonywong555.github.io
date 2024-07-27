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
          'id': 'puzzles',
          'title': '🧩🔠 Puzzles ✍🏁',
          'heatMap': `puzzles`,
          'sources': `/data/puzzles/NYT.csv`
        }, 
        {
          'id': 'books',
          'title': '📚 Books 🛋️',
          'heatMap': 'booksV2',
          'sources': '/data/books/entries.csv'
        }
      ];
      
      // Iterate over the Congrations
      for(const aConfig of testConfigs) {
        /* @vite-ignore */
        const dynamicImport = await import(`../lib/${aConfig.heatMap}/index.ts`);
        
        // Check to see if there's a default export.
        if(dynamicImport.default) {
          // Generate the heatmap.
          const heatMapClass = dynamicImport.default;
          const targetCSV = await fetchCSVandConvertToJSON(aConfig.sources);
          const heatMap = new heatMapClass(targetCSV);
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

<!--
<script lang="ts">
  import { base } from "$app/paths";
  import { fetchCSVandConvertToJSON } from '../lib/util';

  import csv from "csvtojson";
  import "cal-heatmap/cal-heatmap.css";
  import CalHeatmap from 'cal-heatmap';
  import Tooltip from 'cal-heatmap/plugins/Tooltip';
	import { onMount } from "svelte";

  import {generateValue, generateDomains, generateRanges} from '../lib/books/index';

  import { PuzzleHeatMap } from '$lib/puzzles';
  import { BookHeatMap } from "$lib/booksV2";

  const START_DATE = new Date('07/01/2024');
  const RANGE = 6;
  const PASTEL_COLOR = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"];
  /*
  let heatmaps = [];

  onMount(async() => {
    try {
      heatmaps = (await (await fetch(`${base}/config.json`)).json());
    } catch(e) {
      console.log(e);
    }
  });

  const defaultConfig = {
    date: {
      start: new Date('2024-07-20')
    },
    range: 12,
    scale: {
      color: {

      }
    }
  }

  $: if (heatmaps.length > 0) {
    // Fetch information
    
  }
  */

  onMount(async() => {
  const activites = [
  { date: '2024-07-24', value: 50, notes: 'Chess.com Daily Puzzle\n' },
  { date: '2024-07-25', value: 100, notes: 'Chess.com Daily Puzzle. 5 Matches' }
];

  new CalHeatmap().paint({
    data: {
      source: activites,
      x: 'date',
      y: 'value',
    },
    date: { start: START_DATE },
    range: RANGE,
    itemSelector: '#chess-heatmap',
    scale: {
      color: {
        type: 'ordinal',
        domain: [50, 100],
        range: ['yellow', 'green'],
      },
    },
    domain: { type: 'month' },
    subDomain: {
      width: 15,
      height: 15,
      type: 'day',
      label: null,
      color: '#FFF',
    },
  }, [
    [
      Tooltip,
      {
        text: function (date, value, dayjsDate) {
          if(value) {
            console.log(dayjsDate);
            console.log(value);
            console.log(Object.keys(dayjsDate));
            const selectDate = new Date(dayjsDate['$d']);
            console.log('selectDate', selectDate);
            const formattedSelectDateString = getDateString(selectDate);
            console.log('formattedSelectDateString', formattedSelectDateString);

            const anActivity = activites.find((anActivity) => {
              const activityDate = getDateString(new Date(anActivity.date));
              console.log('activityDate', activityDate);
              console.log(formattedSelectDateString == activityDate);
              return formattedSelectDateString == activityDate;
            });

            if(anActivity) {
              console.log('hit');
              return anActivity.notes;
            }
          }
          return '';
        },
      },
    ]]);

      /**
       * Puzzles
       */
      try {
        const puzzlesCSV = await fetchCSVandConvertToJSON(`${base}/data/puzzles/NYT.csv`);
        const puzzleHeatMap = new PuzzleHeatMap(puzzlesCSV);
        const puzzleLogs = puzzleHeatMap.generateValue();
        const puzzleDomains = puzzleHeatMap.generateDomains();
        const puzzleRanges = puzzleHeatMap.generateRanges();
        
        new CalHeatmap().paint({
          data: {
            source: puzzleLogs,
            x: 'date',
            y: d => +d['value'],
        },
        date: { start: START_DATE },
        range: RANGE,
        itemSelector: '#puzzles-heatmap',
        scale: {
          color: {
            type: 'threshold',
            domain: puzzleDomains,
            range: puzzleRanges,
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
                return puzzleHeatMap.toolTip(date, value, dayjsDate, puzzleHeatMap);
              },
            },
          ]
        ]);


      } catch (e) {
        console.log(`Error! \n ${e}`);
      }

      /*
    const puzzlesHeatMap = new CalHeatmap().paint({
      data: {
        source: puzzlesLogs,
        type: 'csv',
        x: 'date',
        y: d => +d['value'],
    },
    date: { start: START_DATE },
    range: RANGE,
    itemSelector: '#puzzles-heatmap',
    scale: {
      color: {
        type: 'threshold',
        domain: puzzleDomains,
        range: puzzleRanges,
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
    }, [
    [
      Tooltip,
      {
        text: function (date, value, dayjsDate) {
          if(value) {
            console.log(dayjsDate);
            console.log(value);
            console.log(Object.keys(dayjsDate));
            const selectDate = new Date(dayjsDate['$d']);
            console.log('selectDate', selectDate);
            const formattedSelectDateString = getDateString(selectDate);
            console.log('formattedSelectDateString', formattedSelectDateString);

            const anActivity = puzzlesLogs.find((anActivity) => {
              const activityDate = getDateString(new Date(anActivity.date));
              console.log('activityDate', activityDate);
              console.log(formattedSelectDateString == activityDate);
              return formattedSelectDateString == activityDate;
            });

            if(anActivity) {
              console.log('hit');
              return `Hit`;
            }
          }
          return '';
        },
      },
    ]]);
      *.
    /**
     * Books
    */

    try {
      const booksCSV = await fetchCSVandConvertToJSON(`${base}/data/books/entries.csv`);
      const bookHeatMap = new BookHeatMap(booksCSV);
      const bookLogs = bookHeatMap.generateValue();
      const bookDomains = bookHeatMap.generateDomains();
      const bookRanges = bookHeatMap.generateRanges();
      
      new CalHeatmap().paint({
        data: {
          source: bookLogs,
          x: 'date',
          y: d => +d['value'],
      },
      date: { start: START_DATE },
      range: RANGE,
      itemSelector: '#books-heatmap',
      scale: {
        color: {
          type: 'ordinal',
          domain: bookDomains,
          range: bookRanges,
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
              return bookHeatMap.toolTip(date, value, dayjsDate, bookHeatMap);
            },
          },
        ]
      ]);
    } catch (e) {
      console.log(e);
    }
})

const getDateString = (aDate) => {
  return `${aDate.getMonth() + 1}/${aDate.getDate()}/${aDate.getFullYear()}`
}


// Source: https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
</script>

<h1>Anthony Wong's Habit Tracker</h1>

<div id="heatmaps">
  <div id="fitness">
    <h1>🏃 Fitness 🏋️</h1>
    <div id="fitness-heatmap"></div>
  </div>

  <div id="books">
    <h1>📚 Books 🛋️</h1>
    <div id="books-heatmap"></div>
    <div id="books-legend-label"></div>
  </div>

  <div id="chess">
    <h1>♟️ Chess ♞</h1>
    <div id="chess-heatmap"></div>
  </div>

  <div id="puzzles">
    <h1>🧩🔠 Puzzles ✍🏁</h1>
    <div id="puzzles-heatmap"></div>
  </div>
</div>
-->
<!--
<div id="heatmaps">
  {#each heatmaps as heatmap}
    <div id="{heatmap.name}">
      <h1>{heatmap.name}</h1>
      <div id="{heatmap.name}-heatmap"></div>
    </div>
  {/each}
</div>
-->

<!--<a href="{base}/2023">2023</a>-->
<!--<a href="{base}/about">About</a>-->