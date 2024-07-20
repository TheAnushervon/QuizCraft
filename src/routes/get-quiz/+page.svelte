<script lang="ts">
	import UserQuizzes from '$lib/UserQuizzes.svelte';
	import CheckLogin from '$lib/CheckLogin.svelte';
</script>

<CheckLogin>
	<main>
		<UserQuizzes />
	</main>
</CheckLogin>
