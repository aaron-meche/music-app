<!-- created by Aaron Meche -->
<script>
  import { page } from '$app/stores';
  import { onMount, onDestroy } from 'svelte';
  import { musickitInstance, initializeMusicKit } from '$lib/music';
  import { devtoken } from "$lib/env"

  $: curr_song = $page.url.searchParams.get('id');

  let music;
  let songDetails = null;
  let isPlaying = false;
  let isLoading = false;
  let error = null;

  let currentTime = 0;
  let duration = 0;
  let isSeeking = false;
  let volume = 1;

  const isLibraryId = (id) => id?.startsWith('i.') || id?.startsWith('l.');

  function getArtwork(url, size = 600) {
    return url?.replace('{w}x{h}', `${size}x${size}`);
  }

  function formatTime(ms) {
    if (!ms || isNaN(ms)) return '0:00';
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  function formatCurrentTime(sec) {
    if (!sec || isNaN(sec)) return '0:00';
    const min = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${min}:${s.toString().padStart(2, '0')}`;
  }

  const unsub = musickitInstance.subscribe(async (val) => {
    music = val;
    if (!music) return;

    music.addEventListener('playbackStateDidChange', ({ state }) => {
      isPlaying = state === MusicKit.PlaybackStates.playing;
    });

    music.addEventListener('playbackTimeDidChange', () => {
      if (!isSeeking) {
        currentTime = music.currentPlaybackTime;
        duration = music.currentPlaybackDuration;
      }
    });
  });

  onMount(async () => {
    if (!curr_song) return;

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
      if (isLibraryId(curr_song)) {
        const response = await music.api.music(`/v1/me/library/songs/${curr_song}`);
        songDetails = response.data.data[0];
      } else {
        const response = await music.api.music(`/v1/catalog/us/songs/${curr_song}`);
        songDetails = response.data.data[0];
      }
    } catch (err) {
      error = 'Could not load song.';
      console.error(err);
    } finally {
      isLoading = false;
    }
  }

  async function togglePlay() {
    if (!music) return;

    if (isPlaying) {
      await music.pause();
    } else {
      const nowId = music.nowPlayingItem?.id;
      if (nowId !== curr_song) {
        if (isLibraryId(curr_song)) {
          await music.setQueue({ song: curr_song, library: true });
        } else {
          await music.setQueue({ song: curr_song });
        }
      }
      await music.play();
    }
  }

  function onSeekInput(e) {
    isSeeking = true;
    currentTime = parseFloat(e.target.value);
  }

  async function onSeekChange(e) {
    const time = parseFloat(e.target.value);
    music.currentPlaybackTime = time;
    currentTime = time;
    isSeeking = false;
  }

  function onVolumeChange(e) {
    volume = parseFloat(e.target.value);
    music.volume = volume;
  }

  onDestroy(() => {
    unsub();
  });

  $: progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
</script>

<div class="page">
  {#if isLoading}
    <div class="state-msg">Loading...</div>

  {:else if error}
    <div class="state-msg error">{error}</div>

  {:else if !curr_song}
    <div class="state-msg">No song ID provided.</div>

  {:else if songDetails}
    {@const attrs = songDetails.attributes}

    <div class="player">

      <!-- Artwork -->
      <div class="artwork-wrap">
        <img
          src={getArtwork(attrs.artwork?.url)}
          alt={attrs.albumName}
          class="artwork"
          class:playing={isPlaying}
        />
      </div>

      <!-- Song Info -->
      <div class="info">
        <h1 class="song-name">{attrs.name}</h1>
        <h2 class="artist-name">{attrs.artistName}</h2>
        <p class="album-name">{attrs.albumName}</p>
      </div>

      <!-- Seek Bar -->
      <div class="seek-wrap">
        <span class="time">{formatCurrentTime(currentTime)}</span>
        <div class="seek-track">
          <div class="seek-fill" style="width: {progressPercent}%"></div>
          <input
            type="range"
            class="seek-input"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            on:input={onSeekInput}
            on:change={onSeekChange}
          />
        </div>
        <span class="time">{formatTime(attrs.durationInMillis)}</span>
      </div>

      <!-- Controls -->
      <div class="controls">
        <button class="ctrl-btn" on:click={() => music.skipToPreviousItem()}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
          </svg>
        </button>

        <button class="play-btn" on:click={togglePlay}>
          {#if isPlaying}
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          {:else}
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
              <path d="M8 5v14l11-7z"/>
            </svg>
          {/if}
        </button>

        <button class="ctrl-btn" on:click={() => music.skipToNextItem()}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14 4.96 3.5L8 15.86V9.86zM16 6h2v12h-2z"/>
          </svg>
        </button>
      </div>

      <!-- Volume -->
      <div class="volume-wrap">
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" opacity="0.5">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
        </svg>
        <input
          type="range"
          class="volume-input"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          on:input={onVolumeChange}
        />
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" opacity="0.5">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      </div>

    </div>
  {/if}
</div>

<style lang="rue">
  .page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #0d0d0d;
    color: white;
  }

  .state-msg {
    opacity: 0.5;
    font-size: 1rem;
  }

  .state-msg.error {
    color: #ff4d4d;
    opacity: 1;
  }

  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    max-width: 380px;
    padding: 2rem 1.5rem;
  }

  /* Artwork */
  .artwork-wrap {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .artwork-wrap:has(.playing) {
    transform: scale(1.03);
    box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7);
  }

  .artwork {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Info */
  .info {
    text-align: center;
    width: 100%;
  }

  .song-name {
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist-name {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.7;
    margin: 0 0 0.2rem;
  }

  .album-name {
    font-size: 0.8rem;
    opacity: 0.4;
    margin: 0;
  }

  /* Seek */
  .seek-wrap {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
  }

  .time {
    font-size: 0.75rem;
    opacity: 0.5;
    min-width: 36px;
    font-variant-numeric: tabular-nums;
  }

  .time:last-child {
    text-align: right;
  }

  .seek-track {
    position: relative;
    flex: 1;
    height: 4px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 999px;
  }

  .seek-fill {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: white;
    border-radius: 999px;
    pointer-events: none;
  }

  .seek-input {
    position: absolute;
    inset: -8px 0;
    width: 100%;
    opacity: 0;
    cursor: pointer;
    height: 20px;
  }

  /* Controls */
  .controls {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .ctrl-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    opacity: 0.7;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    transition: opacity 0.15s;
  }

  .ctrl-btn:hover {
    opacity: 1;
  }

  .play-btn {
    background: white;
    color: #0d0d0d;
    border: none;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.15s, opacity 0.15s;
  }

  .play-btn:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }

  /* Volume */
  .volume-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }

  .volume-input {
    flex: 1;
    accent-color: white;
    cursor: pointer;
  }
</style>