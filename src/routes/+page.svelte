<script lang="ts">
	import CheckLogin from '$lib/CheckLogin.svelte';
	import GetQuiz from '$lib/GetQuiz.svelte';
	export let data;
	console.log(data);
</script>

<CheckLogin>
	<main>
		<GetQuiz {data} />
	</main>
</CheckLogin>
