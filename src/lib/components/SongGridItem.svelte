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

</script>

<!--  -->

<a href={resolve("/play?href=" + song.href)} class="item">
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
        border-radius: 1.6rem;
        opacity: 0.9;
        cursor: pointer;

        img{
            width: calc(100% - 1.2rem);
            margin: 0.6rem;
            aspect-ratio: 1 / 1;
            border-radius: 0.6rem;
            transition: 250ms;
        }

        .details{
            display: grid;
            gap: 0.2rem;
            margin-inline: 0.8rem;
            margin-bottom: 1.2rem;
            font-size: 0.8rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            opacity: 0.9;
            transition: 250ms;

            .name{
                font-weight: 500;
            }
            .artist{
                opacity: 0.75;
            }
        }

        :hover{
            opacity: 1;

            img{
                width: 100%;
                margin: 0rem;
            }
            
            .details{
                margin: 0.6rem 0.8rem;
            }
        }
    }

</style>