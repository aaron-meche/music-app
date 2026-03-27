<!-- created by Aaron Meche -->
<script>
    import { page } from "$app/stores";
    import { db } from "$lib/data"
    import { onMount, beforeUpdate } from "svelte";
    import { music_instance } from "$lib/music";

    $: href = $page.url.searchParams.get("href");
    $: cache = $db.cache
    let cachedObj = null

    db.subscribe(data => {
        console.log(data)
    })

    $: {
        cachedObj = $db.cache.recentlyAdded.find(item => item.href == href) || null
        console.log("c", cachedObj)
    }

    let music;
    let album = null;
    let tracks = [];
    let isLoading = false;
    let error = null;
    let playingTrackId = null;

    function updateMusicInstance() {
        if (cachedObj) {
            // album = cachedObj
        }
        const unsub = music_instance.subscribe(async (instance) => {
            if (!instance) return
            try {
                const response = await instance.api.music(href, {
                    include: 'tracks',
                });
        
                album = response.data.data[0];
                tracks = album.relationships?.tracks?.data ?? [];
                console.log(album)
            }
            catch (error) {
                console.error(error)
            }
        })
    }

    onMount(updateMusicInstance)


</script>

<!--  -->

<div class="page">
{#if album}
    <div class="headline">
        <img src={album.attributes.artwork.url.replace("{w}x{h}", "360x360")} alt="">
    </div>



{/if}
</div>

<!--  -->

<style lang="rue">
</style>
