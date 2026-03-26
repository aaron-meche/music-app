<!-- src/routes/+page.svelte -->
<script>
    import { onMount } from "svelte";
    import { devtoken } from "$lib/env";
    import { db } from "$lib/data"
    import { isAuthorized, music_instance, fetchAppleMusic } from "$lib/music";
    import SongGrid from "$lib/components/SongGrid.svelte";

    let recentlyAdded = []
    $: {
        recentlyAdded = $db.cache.recentlyAdded || []
    }

    const exampleSongObj = {
        id: "i.YJMKodPfRWeWaDe",
        type: "library-songs",
        href: "/v1/me/library/songs/i.YJMKodPfRWeWaDe",
        attributes: {
            albumName: "Kaleidoscope Dream",
            artistName: "Miguel",
            artwork: {
                height: 1200,
                url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a1/56/ac/a156acb2-068e-a616-3e56-86ca656c14ce/886443632943.jpg/{w}x{h}bb.jpg",
                width: 1200,
            },
            discNumber: 1,
            durationInMillis: 193147,
            genreNames: ["R&B/Soul"],
            hasLyrics: true,
            name: "Adorn",
            playParams: {
                catalogId: "561709114",
                id: "i.YJMKodPfRWeWaDe",
                isLibrary: true,
                kind: "song",
                reporting: true,
                reportingId: "561709114",
            },
            releaseDate: "2012-08-07",
            trackNumber: 1,
        },
    };
</script>

<!--  -->

{#if $isAuthorized}
    <div class="page-title">Recently Added</div>
    <div class="content">
        <SongGrid songs={recentlyAdded} />
    </div>
{/if}

<!--  -->

<style lang="rue">
    .page-title{
        margin-top: 4.8rem;
        margin-bottom: 1.2rem;
        margin-inline: 2.4rem;
        font-size: 2.4rem;
        font-weight: 700;
    }
    
    .content{
        margin-inline: 1.6rem;
    }
</style>