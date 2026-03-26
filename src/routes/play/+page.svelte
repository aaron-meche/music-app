<!-- created by Aaron Meche -->
<script>
    import { page } from "$app/stores";
    import { db } from "$lib/data"
	import { onMount, onDestroy } from "svelte";
	import { music_instance, isAuthorized, fetchAppleMusic } from "$lib/music";
	import { devtoken } from "$lib/env";

    onMount(() => {
        if (isAuthorized) {
            console.log("Authorized")
            console.log(music_instance)
        }
        else {
            console.log("Not authorized")
        }
    })

    let href = null
    $: {
        href = $page.url.searchParams.get("href");
        // console.log($db.music)
    }
</script>

<!--  -->

<div class='page'>
    {href}
</div>

<!--  -->

<style lang="rue">

</style>