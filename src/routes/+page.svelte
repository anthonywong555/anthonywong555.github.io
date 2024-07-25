<script lang="ts">
  import { base } from "$app/paths";

  import "cal-heatmap/cal-heatmap.css";
  import CalHeatmap from 'cal-heatmap';
	import { onMount } from "svelte";

    onMount(async() => {
      console.log(`base: ${base}`);
      try {
        const response = await fetch(`test.json`);
        console.log(response);
        console.log(await response.json());
      } catch(e) {
        console.log(e);
      }
        
        
        new CalHeatmap().paint({
          itemSelector: '#chess',
  data: {
    source: `${base}/config.json`,
    x: 'date',
    y: 'value'
  },
  date: {
    start: new Date('2023-10-01'),
    end: new Date('2024-02-01')
  },
  range: 4,
  scale: {
      color: {
        type: 'quantize',
        scheme: 'Greens',
        domain: [0, 1, 2, 3, 4, 5, 6],
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
});

        new CalHeatmap().paint({
          itemSelector: '#books'
        });

        new CalHeatmap().paint({
          itemSelector: '#fitness'
        })
    });
</script>

<h1>Anthony Wong's Habit Tracker</h1>
<h2>Chess</h2>
<div id="chess"></div>

<h3>Books</h3>
<div id="books"></div>

<h3>Fitness</h3>
<div id="fitness"></div>

<!--<a href="{base}/about">About</a>-->