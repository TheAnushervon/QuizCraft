<script lang="ts">
	import QuizItem from './QuizItem.svelte';

	interface Quiz {
		id: number;
		title: string;
	}

	let quizzes: Quiz[] = [
		{ id: 1, title: 'Quiz 1' },
		{ id: 2, title: 'Quiz 2' },
		{ id: 3, title: 'Quiz 3' },
		{ id: 4, title: 'Quiz 4' },
		{ id: 5, title: 'Quiz 5' },
		{ id: 6, title: 'Quiz 6' },
		{ id: 7, title: 'Quiz 7' },
		{ id: 8, title: 'Quiz 8' },
		{ id: 9, title: 'Quiz 9' }
	];
</script>
<div class="scrollbar-container">
	<ul class="quiz-list">
		{#each quizzes as quiz (quiz.id)}
			<li class="quiz-list">
				<QuizItem title={quiz.title} />
			</li>
		{/each}
	</ul>
</div>

<style>
	ul.quiz-list {
		list-style-type: disc;
		border-radius: 20px;
		display: flex;
		margin-top: 0;
		flex-direction: column;
		padding: 16px;
	}
	
	li.quiz-list {
		background-color: rgba(0, 0, 0, 0);
		list-style-type: none;
	}

	@media (max-width: 991px) {
		.quiz-list {
			padding: 12px;
		}
	}

	.scrollbar-container {
		height:420px;
		width:40%;
		overflow:hidden; 
		overflow-y:scroll;
	}

	.scrollbar-container::-webkit-scrollbar {
		background-color: #53E82420;
		border-radius: 5px;
		width: 30px;
		border: 3px solid #4AC32420;
	}

	.scrollbar-container::-webkit-scrollbar-thumb {
		border-radius: 5px;
		background-color: #61377B;
		border: 1px solid #000;
	}
	
</style>
