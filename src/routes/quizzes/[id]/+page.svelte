<script lang="ts">
	import QuizCreation from '$lib/QuizCreation.svelte';
	export let data;
	console.log(data);
</script>

<main>
	<QuizCreation {data} />
</main>
