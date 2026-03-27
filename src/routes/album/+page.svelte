<!-- created by Aaron Meche -->
<script>
    import { page } from "$app/stores";
    import { db } from "$lib/data";
    import { onMount, beforeUpdate } from "svelte";
    import { music_instance } from "$lib/music";

    $: href = $page.url.searchParams.get("href");
    $: cache = $db.cache;
    let cachedObj = null;
    let activeAlbum;

    $: {
        activeAlbum = $db.active;
    }

    let album = null;
    let tracks = [];

    onMount(() => {
        if (activeAlbum) {
            console.log(activeAlbum);
            album = activeAlbum;
        }
    });

    const obj = {
        id: "l.0qvn2Ip",
        type: "library-albums",
        href: "/v1/me/library/albums/l.0qvn2Ip",
        attributes: {
            artistName: "Tame Impala",
            artwork: {
                height: 1200,
                url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/80/54/11/80541122-c1c4-50ad-a673-ff79f4cf8aa7/196873555331.jpg/{w}x{h}bb.jpg",
                width: 1200,
            },
            dateAdded: "2026-03-26T20:15:24Z",
            genreNames: ["Alternative"],
            name: "Deadbeat",
            playParams: {
                id: "l.0qvn2Ip",
                isLibrary: true,
                kind: "album",
            },
            releaseDate: "2025-09-26",
            trackCount: 1,
        },
    };
</script>

<!--  -->

<div class="page">
    <div class="action-bar">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button on:click={() => history.back()} class="back">
            <i class="fa-solid fa-arrow-left"></i>
        </button>
    </div>
    {#if album}
        <div class="headline">
            <img
                class="thumbnail"
                src={album.attributes.artwork.url.replace("{w}x{h}", "240x240")}
                alt=""
            />
            <div class="details">
                <div class="info">
                    <div class="album-name">{album.attributes.name}</div>
                    <div class="artist-name">{album.attributes.artistName}</div>
                </div>
                <div class="actions">
                    <button class="play">
                        <i class="fa-solid fa-play"></i>
                        Play
                    </button>
                    <button class="shuffle">
                        <i class="fa-solid fa-shuffle"></i>
                        Shuffle
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>

<!--  -->

<style lang="rue">
    .page{
        display: grid;
        gap: 1.6rem;
        padding-top: 1.6rem;
        padding-left: 0.8rem;
    }
    button.back{
        height: 1.2rem;
        width: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.8rem;
        font-size: 0.8rem;
        background: var(--l1);
        border-radius: 100vh;
        cursor: pointer;

        :hover{
            background: var(--l2);
        }
    }
    .headline {
        display: grid;
        grid-template-columns: min-content auto;
        align-items: center;
        gap: 1.6rem;

        img{
            height: 240px;
            width: 240px;
            background: linear-gradient(to top right, rgb(25, 25, 25), rgb(50, 50, 50));
            border-radius: 0.8rem;
        }

        .details{
            height: 100%;
            display: grid;
            grid-template-rows: auto min-content;
            .info{
                display: grid;
                align-items: center;
                .album-name{
                    font-size: 2rem;
                    font-weight: 700;
                }
        
                .artist-name{
                    font-size: 1.6rem;
                    font-weight: 400;
                    opacity: 0.75;
                }
            }
            .actions{

            }
        }

    }
</style>
