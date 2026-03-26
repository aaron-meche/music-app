<script>
	import '$lib/main.css';
	import '$lib/main.rue';
    import TopNavbar from '$lib/components/TopNavbar.svelte';
	import { onMount } from 'svelte';
	import { db } from "$lib/data"
	let { children } = $props();

	// Regular Update Cycle
	// ... cache management, 
	// ... other updates ...
	function regularUpdateCycle() {
		console.log("RegUpdate")
		db.update(data => {
			// let libraryAppIdArray = data?.cache?.libraryAppIdArray || []
			// // Missing User Object
			// if (Object.keys(data.user).length < 1) {
			// 	console.log("Fetching playerSummary")
			// 	serverAPI.get("playerSummary/" + steamID, (res => {
			// 		db.update(data => {
			// 			data.user = res.response.players[0]
			// 			return data
			// 		})
			// 	}))
			// }
			// // No Saved LibraryAppIdArray
			// if (!data?.cache?.libraryAppIdArray) {
			// 	console.log("Fetching ownedGames")
			// 	serverAPI.get("ownedGames/" + steamID, res => {
			// 		data.cache.libraryAppIdArray = res?.response?.games.map(i => i.appid) || []
			// 	})
			// }
			// // Check for missing Library object
			// if (!data?.cache?.library) data.cache.library = {}
			// // Check for missing Library Cache content
			// if (Object.keys(data?.cache?.library) < libraryAppIdArray.length) {
			// 	for (let i = 0; i < libraryAppIdArray.length; i++) {
			// 		let appID = libraryAppIdArray[i]
			// 		if (!data.cache.library?.[appID]) {
			// 			serverAPI.get("gameDetails/" + appID, res => {
			// 				data.cache.library[appID] = res?.[appID]?.data
			// 			})
			// 		}
			// 	}
			// }
			// console.log("cache", data.cache)
			return data
		})
	}

	onMount(regularUpdateCycle)
</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
	<title>My Aapp</title>
	<script src="https://kit.fontawesome.com/5cf062dc93.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="app">
	<div class="top-navbar">
		<TopNavbar />
	</div>
	
	<div class="main">
		{@render children()}
	</div>
</div>

<style>

</style>