<!-- created by Aaron Meche -->
<script>
    import { page } from "$app/stores";
    import { devtoken } from "$lib/env"
    import { onMount, onDestroy } from "svelte";
    import { musickitInstance, initializeMusicKit } from "$lib/music";

    $: curr_song = $page.url.searchParams.get("id");

    let music;
    let songDetails = null;
    let isPlaying = false;
    let isLoading = false;
    let error = null;

    const unsub = musickitInstance.subscribe((val) => {
        music = val;

        if (music) {
            music.addEventListener("playbackStateDidChange", ({ state }) => {
                isPlaying = state === MusicKit.PlaybackStates.playing;
            });
        }
    });

    onMount(async () => {
        if (!curr_song) return;

        // Initialize MusicKit if not already done
        if (!music) {
            music = await initializeMusicKit(devtoken);
        }

        await loadSongDetails();
    });

    async function loadSongDetails() {
        if (!music || !curr_song) return;

        isLoading = true;
        error = null;

        try {
            const response = await music.api.music(
                `/v1/catalog/us/songs/${curr_song}`,
            );
            songDetails = response.data.data[0];
        } catch (err) {
            error = "Could not load song details.";
            console.error(err);
        } finally {
            isLoading = false;
        }
    }

    async function togglePlay() {
        if (!music || !curr_song) return;

        if (isPlaying) {
            await music.pause();
        } else {
            if (music.nowPlayingItem?.id !== curr_song) {
                await music.setQueue({ song: curr_song });
            }
            await music.play();
        }
    }

    function getArtwork(url, size = 300) {
        return url?.replace("{w}x{h}", `${size}x${size}`);
    }

    onDestroy(() => {
        unsub();
    });
</script>

<!--  -->

<div class="page">
    {#if isLoading}
        <p>Loading...</p>
    {:else if error}
        <p class="error">{error}</p>
    {:else if songDetails}
        {@const attrs = songDetails.attributes}

        <div class="player">
            <img
                src={getArtwork(attrs.artwork?.url)}
                alt={attrs.albumName}
                class="artwork"
            />

            <div class="info">
                <h1>{attrs.name}</h1>
                <h2>{attrs.artistName}</h2>
                <p class="album">{attrs.albumName}</p>
            </div>

            <button class="play-btn" on:click={togglePlay}>
                {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
        </div>
    {:else if !curr_song}
        <p>No song ID provided.</p>
    {/if}
</div>

<!--  -->

<style lang="rue">
    .page {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    .player {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        text-align: center;
    }

    .artwork {
        width: 300px;
        height: 300px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .info h1 {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .info h2 {
        font-size: 1.1rem;
        opacity: 0.7;
    }

    .album {
        font-size: 0.9rem;
        opacity: 0.5;
    }

    .play-btn {
        margin-top: 1rem;
        padding: 0.75rem 2.5rem;
        font-size: 1.1rem;
        border-radius: 999px;
        border: none;
        background: #fa2d48;
        color: white;
        cursor: pointer;
    }

    .play-btn:hover {
        opacity: 0.85;
    }

    .error {
        color: red;
    }
</style>
