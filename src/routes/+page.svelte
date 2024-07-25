<script lang="ts">
    import { base } from '$app/paths';

    import "cal-heatmap/cal-heatmap.css";
    import CalHeatmap from 'cal-heatmap';
	import { onMount } from "svelte";

    onMount(async() => {
        const cal = new CalHeatmap();
        cal.paint({
            itemSelector: '#test'
        });
    });
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<nav>
    <a href="{base}/">Home</a>
    <a href="{base}/about">About</a>
</nav>

<div id="test"></div>