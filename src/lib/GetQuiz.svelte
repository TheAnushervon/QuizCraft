<script lang="ts">
	import QuizItem from './QuizItem.svelte';
	export let data;

	interface QuizPair {
		name: string;
		id: string;
	}

	// // let quizzes: Quiz[] = [
	// // 	{ id: 1, title: 'Quiz 1' },
	// // 	{ id: 2, title: 'Quiz 2' },
	// // 	{ id: 3, title: 'Quiz 3' },
	// // 	{ id: 4, title: 'Quiz 4' },
	// // 	{ id: 5, title: 'Quiz 5' },
	// // 	{ id: 6, title: 'Quiz 6' },
	// // 	{ id: 7, title: 'Quiz 7' },
	// // 	{ id: 8, title: 'Quiz 8' },
	// // 	{ id: 9, title: 'Quiz 9' }
	// // ];

	let quiz_pair: QuizPair[] = [];

	if (data != undefined) {
		for (const i of data.quizzes) {
			quiz_pair.push({ name: i.name, id: i.id });
		}
	}
</script>

<div class="scrollbar-container">
	<ul class="quiz-list">
		{#each quiz_pair as pair}
			<li class="quiz-list">
				<a href={`/take-quiz/${pair.id}`} class="quiz-item"> {pair.name} </a>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
