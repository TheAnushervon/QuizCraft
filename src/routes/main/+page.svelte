<script lang="ts">
	import CheckLogin from '$lib/CheckLogin.svelte';
	import ProfilePage from '$lib/ProfilePage.svelte';
	export let data;
	console.log(data);
</script>

<CheckLogin>
	<main>
		<ProfilePage {data} />
	</main>
</CheckLogin>
