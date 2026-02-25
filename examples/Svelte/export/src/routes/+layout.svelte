<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <title>Svelte Calendar minimal Example</title>
</svelte:head>

{@render children()}
