<script lang="ts">
	import { onMount } from 'svelte';
	import Calendar from './calendar.svelte';

	let showCalendar = false;

	onMount(async () => {
		showCalendar = true;
	});
</script>

<h1>Svelte Calendar minimal Example</h1>
{#if showCalendar}
	<Calendar />
{:else}
	<p>Loading calendar...</p>
{/if}
