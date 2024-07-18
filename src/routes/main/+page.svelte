<script lang="ts">
	import CheckLogin from '$lib/CheckLogin.svelte';
	import ProfilePage from '$lib/ProfilePage.svelte';
</script>

<CheckLogin>
	<main>
		<ProfilePage />
	</main>
</CheckLogin>