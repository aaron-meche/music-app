<!-- created by Aaron Meche -->
<script>
    import { resolve } from "$app/paths";    import { page } from '$app/stores';

    let active_path = $derived($page.url.pathname)
    let { label, path } = $props()

</script>

<!--  -->

<a class={path?.split("?")[0] == active_path ? "active" : ""} href={resolve(path)}>{label}</a>

<!--  -->

<style lang="rue">
    a{
        padding: 0.8rem 1.6rem;
        cursor: pointer;
        border-radius: 0.4rem;

        
        :hover{
            background: var(--l1);
        }
    }
    a.active{
        color: var(--bright-accent);
        background: var(--la1);
    }
</style>