<script lang="ts">
	import { page } from '$app/stores';



    $:  is_url = (url:string) => {
        return $page.url.pathname === url;
    }
</script>

<header>

    <ul>
        <li class:active={is_url("/")}>
            <a sveltekit:prefetch href="/">Home</a></li>
        <li class:active={is_url("/properties")}>
            <a sveltekit:prefetch href="/properties">Properties</a>
        </li>
        <li class:active={is_url("/contact")}>
            <a sveltekit:prefetch href="/contact">Contact</a>
        </li>
    </ul>

</header>


<style>

    li.active{
        background-color: gray;
    }
</style>

