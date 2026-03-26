<!-- created by Aaron Meche -->
<script>
    import SongGridItem from "$lib/components/SongGridItem.svelte";

    let { songs } = $props()

</script>

<!--  -->

<div class="wrapper">
    {#each songs as song}
        <SongGridItem song={song} />
    {/each}
</div>

<!--  -->

<style lang="rue">
    .wrapper{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    }
</style>