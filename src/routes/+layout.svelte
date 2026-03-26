<script>
	import '$lib/main.css';
	let { children } = $props();

</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
	<title>My Aapp</title>
	<script src="https://kit.fontawesome.com/5cf062dc93.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="page">
	{@render children()}
</div>

<style>

</style>