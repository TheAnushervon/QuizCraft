<script lang="ts">
	import QuizItem from './QuizItem.svelte';

	interface Quiz {
		id: number;
		title: string;
	}

	let quizzes: Quiz[] = [
		{ id: 1, title: 'Quiz 1' },
		{ id: 2, title: 'Quiz 2' },
		{ id: 3, title: 'Quiz 3' }
	];
</script>

<ul class="quiz-list">
	{#each quizzes as quiz (quiz.id)}
		<li>
			<QuizItem title={quiz.title} />
		</li>
	{/each}
</ul>

<style>
	.quiz-list {
		list-style-type: none;
		padding: 0;
		margin: 0;
		border-radius: 20px;
		background-color: rgba(137, 33, 194, 0.26);
		display: flex;
		margin-top: 16px;
		flex-direction: column;
		padding: 16px;
	}

	@media (max-width: 991px) {
		.quiz-list {
			padding: 12px;
		}
	}
</style>
