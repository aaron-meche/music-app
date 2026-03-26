<!-- created by Aaron Meche -->
<script>
    import { resolve } from "$app/paths";

    let { song } = $props()

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

    $effect(() => {
        console.log(song)
    })

</script>

<!--  -->

<a href={resolve("/playing?id=" + song.id)} class="item">
    <img src={song.attributes.artwork.url.replace("{w}x{h}","160x160")} alt={song.attributes.albumName}>
    <div class="details">
        <div class="name">{song.attributes.name || "Unknown"}</div>
        <div class="artist">{song.attributes.artistName || "Unknown"}</div>
        <!-- <div class="album">{song.attributes.albumName}</div> -->
    </div>
</a>

<!--  -->

<style lang="rue">
    .item{
        display: grid;
        gap: 0.8rem;
        padding: 0.8rem;
        border-radius: 1.6rem;
        cursor: pointer;

        img{
            width: 100%;
            aspect-ratio: 1 / 1;
            border-radius: 0.8rem;
        }

        .details{
            display: grid;
            gap: 0.2rem;
            margin-bottom: 0.4rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            .name{
                font-weight: 500;
            }
            .artist{
                opacity: 0.75;
            }
        }


        :hover{
            background: linear-gradient(to top right, var(--la0), var(--la1));
            outline: solid 1pt var(--l3);
        }
    }

</style>