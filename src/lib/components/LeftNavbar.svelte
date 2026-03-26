<!-- created by Aaron Meche -->
<script>
    import { resolve } from "$app/paths";    
    import { page } from '$app/stores';
    import LeftNavbarItem from "$lib/components/LeftNavbarItem.svelte";

    let path = $derived($page.url.pathname)

</script>

<!--  -->

<div class="wrapper">
    <a href={resolve("/")} class="logo">music</a>

    <div class="nav-stack">
        <LeftNavbarItem label="Recently Added" path="/" />
        <LeftNavbarItem label="Songs" path="/songs" />
        <LeftNavbarItem label="Currently Playing" path="/play" />
    </div>
</div>

<!--  -->

<style lang="rue">
    .logo{
        padding: 1.6rem 2.4rem;
        font-size: 2rem;
        font-weight: 700;
        cursor: pointer;
        :hover{
            color: var(--bright-accent);
        }
    }

    .nav-stack{
        padding: 0 0.8rem;
    }

</style>