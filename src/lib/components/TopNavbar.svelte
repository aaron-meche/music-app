<!-- created by Aaron Meche -->
<script>
    import { resolve } from "$app/paths";	
    import { page } from '$app/stores';

    let path = $derived($page.url.pathname)

</script>

<!--  -->

<div class='wrapper'>
    <a href={resolve("/")} class="logo">Music</a>
    <div class="float-right">
        <a href={resolve("/")} class="item {path == "/" ? "active" : ""}">Library</a>
        <a href={resolve("/songs")} class="item {path == "/songs" ? "active" : ""}">Songs</a>
        <a href={resolve("/profile")} class="item {path == "/profile" ? "active" : ""}">Profile</a>
    </div>
</div>

<!--  -->

<style lang="rue">
    .wrapper{
        display: grid;
        grid-template-columns: auto min-content;
        padding: 1.6rem var(--inline-moat);
    }

    .logo{
        width: fit-content;
        font-size: 2rem;
        font-weight: 600;
        cursor: pointer;

        :hover{
            text-decoration: underline;
        }
    }

    .float-right{
        display: flex;
        align-items: center;
        white-space: nowrap;

        .item{
            padding: 0.6rem 1.2rem;
            cursor: pointer;

            :hover{
                background: var(--l1);
            }

        }
        .item.active{
            color: var(--accent);
        }
    }

</style>