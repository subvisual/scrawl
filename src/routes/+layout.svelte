<script lang="ts">

	import { ROUTES } from "$lib/routes";

</script>
<main>
	<nav>
		<a href={ROUTES.home}>Home</a>
		<a href={ROUTES.new}>New</a>
	</nav>
	<slot />
</main>
