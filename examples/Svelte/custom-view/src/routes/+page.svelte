<script lang="ts">
	import Calendar from './calendar.svelte';
</script>

<style>
	:global(body) { font-family: system-ui, -apple-system, sans-serif; background: #f4f4f5; padding: 2rem; }
	.container { max-width: 900px; margin: 0 auto; background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
</style>

<div class="container">
	<Calendar />
</div>
