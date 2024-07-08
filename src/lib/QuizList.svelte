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
		list-style-type: disc;
		border-radius: 20px;
		display: flex;
		margin-top: 0;
		flex-direction: column;
		padding: 16px;
	}

	@media (max-width: 991px) {
		.quiz-list {
			padding: 12px;
		}
	}
</style>
