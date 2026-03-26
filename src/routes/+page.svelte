<!-- src/routes/+page.svelte -->
<script>
    import { onMount } from "svelte";
    import { devtoken } from "$lib/env"
    import {
        initializeMusicKit,
        musickitInstance,
        isAuthorized,
    } from "$lib/music";

    let songs = [];
    let music;

    onMount(async () => {
        music = await initializeMusicKit(devtoken);
    });

    async function authorize() {
        await music.authorize();
        isAuthorized.set(music.isAuthorized);
    }

    async function fetchLibrarySongs() {
        const response = await music.api.music("/v1/me/library/songs", {
            limit: 25,
            offset: 0,
        });

        songs = response.data.data;
        console.log(songs)
    }
</script>

{#if !$isAuthorized}
    <button on:click={authorize}>Connect Apple Music</button>
{:else}
    <button on:click={fetchLibrarySongs}>Load My Songs</button>
{/if}

{#each songs as song}
    <div>
        <img
            src={song.attributes.artwork?.url.replace("{w}x{h}", "60x60")}
            alt="artwork"
        />
        <p>{song.attributes.name} — {song.attributes.artistName}</p>
    </div>
{/each}
