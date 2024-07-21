<script lang="ts">
	import CheckLogin from '$lib/CheckLogin.svelte';
	import QuizCreation from '$lib/QuizCreation.svelte';
	export let data;
	console.log(data);
</script>

<CheckLogin>
	<main>
		<QuizCreation {data} />
	</main>
</CheckLogin>
