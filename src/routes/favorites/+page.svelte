<script>
	import { favorites } from '$lib/store';
</script>

{#each $favorites.favorites as fav}
	{fav.ref}
{/each}
