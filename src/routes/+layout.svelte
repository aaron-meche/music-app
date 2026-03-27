<script>
	import '$lib/main.css';
	import '$lib/main.rue';
    import TopNavbar from '$lib/components/TopNavbar.svelte';
	import LeftNavbar from '$lib/components/LeftNavbar.svelte';
	import { devtoken } from "$lib/env";
	import { onMount } from 'svelte';
	import { db } from "$lib/data"
    import { initMusicInstance, getMusicData } from "$lib/music";
	let { children } = $props();

    let songs = [];
    let music;

	// Regular Update Cycle
	// ... cache management, 
	// ... other updates ...
	// async function regularUpdateCycle(instance) {
	// 	console.log("RegUpdate")
	// 	db.update(data => {
	// 		if (data.cache.recentlyAdded.length < 1) {
	// 			fetchAppleMusic(instance, "/v1/me/library/recently-added", val => {
	// 				data.cache.recentlyAdded = val
	// 			})
	// 		}
	// 		return data
	// 	})
	// }

	onMount(() => {
		initMusicInstance(async (instance) => {
			getMusicData(instance, "/v1/me/library/recently-added", {
				page: 0,
			}, ret => {
				db.update(data => {
					data.cache.recentlyAdded = ret.data.data
					return data
				})
			})
		})
	})
</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
	<title>My Aapp</title>
	<script src="https://kit.fontawesome.com/5cf062dc93.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="app">
	<div class="left-navbar">
		<LeftNavbar />
	</div>
	
	<div class="main">
		{@render children()}
	</div>
</div>

<style>
	.app{
		display: grid;
		grid-template-columns: 1fr 3fr;
	}
</style>