<script lang="ts">
  import { base } from "$app/paths";

  import "cal-heatmap/cal-heatmap.css";
  import CalHeatmap from 'cal-heatmap';
  import Tooltip from 'cal-heatmap/plugins/Tooltip';
  import Legend from 'cal-heatmap/plugins/Legend';
	import { onMount } from "svelte";

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
    date: { start: new Date('07/01/2024') },
    range: 6,
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
})

const getDateString = (aDate) => {
  return `${aDate.getMonth() + 1}/${aDate.getDate()}/${aDate.getFullYear()}`
}
</script>

<h1>Anthony Wong's Habit Tracker</h1>

<div id="heatmaps">
  <div id="chess">
    <h1>Chess ♟️</h1>
    <div id="chess-heatmap"></div>
  </div>

  <div id="books">
    <h1>Books 📚</h1>
    <div id="books-heatmap"></div>
  </div>

  <div id="fitness">
    <h1>Fitness 🏋️</h1>
    <div id="fitness-heatmap"></div>
  </div>

  <div id="puzzles">
    <h1>Puzzle 🧩</h1>
  </div>
</div>

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