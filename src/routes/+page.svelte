<script lang="ts">
	import CheckLogin from '$lib/CheckLogin.svelte';
	import GetQuiz from '$lib/GetQuiz.svelte';
	export let data;
</script>

<svelte:head>
	{#each data.quizzes as quiz}
		<title>{quiz.user_nickname} - Quizzes page</title>
	{/each}
</svelte:head>

<CheckLogin>
	<main>
		<GetQuiz {data} />
	</main>
</CheckLogin>
