<!-- src/routes/+page.svelte -->
<script>
    import { onMount } from "svelte";
    import { devtoken } from "$lib/env";
    import {
        initializeMusicKit,
        musickitInstance,
        isAuthorized,
    } from "$lib/music";
    import SongGrid from "$lib/components/SongGrid.svelte";

    let songs = [];
    let music;

    async function fetchAppleMusic(instance, path, callback) {
        const response = await instance.api.music(path, {
            limit: 25,
            offset: 0,
            sort: '-dateAdded'
        });

        if (callback) callback(response?.data?.data || null);
    }

    // Page Load
    onMount(async () => {
        music = await initializeMusicKit(devtoken, async (res) => {
            fetchAppleMusic(res, "/v1/me/library/songs", val => {
                console.log(val)
                songs = val
            })
        });
    });

    // Connect Library
    async function authorize() {
        await music.authorize();
        isAuthorized.set(music.isAuthorized);
    }

    const exampleObj = {
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

{#if !$isAuthorized}
    <button on:click={authorize}>Connect Apple Music</button>
{:else}
    <SongGrid {songs} />
{/if}

<!--  -->

<style lang="rue">
    
</style>