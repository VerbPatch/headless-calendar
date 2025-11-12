<script lang="ts">
	import { onMount } from 'svelte';
	import Calendar from '$lib';

	let showCalendar = false;

	onMount(async () => {
		showCalendar = true;
	});
</script>

<h1>Welcome to Svelte Calendar</h1>
{#if showCalendar}
	<Calendar />
{:else}
	<p>Loading calendar...</p>
{/if}
