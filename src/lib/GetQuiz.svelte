<script lang="ts">
	import QuizItem from './QuizItem.svelte';
	export let data;

	interface QuizPair {
		name: string;
		id: string;
	}

	let quiz_pair: QuizPair[] = [];

	if (data != undefined) {
		for (const i of data.quizzes) {
			quiz_pair.push({ name: i.name, id: i.id });
		}
	}
</script>

<div class="profile-page">
	<div class="profile-content">
		<div class="quiz-section">
			<h2>The list of the quizzes</h2>
			<div class="scrollbar-container">
				<ul class="quiz-list">
					{#each quiz_pair as pair}
						<li class="quiz-list-item">
							<button class="quiz-item" on:click={() => window.location.href = `/take-quiz/${pair.id}`}>
								{pair.name}
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.profile-page {
		background: radial-gradient(
			161.81% 143.28% at 26.61% 20.97%,
			#242824 37.47%,
			rgba(83, 232, 36, 0.34) 100%
		);
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		box-sizing: border-box;
	}

	.profile-content {
		width: 100%;
		max-width: 1400px;
		display: flex;
		gap: 20px;
	}

	.quiz-section {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		font-size: 28px;
		color: #fff;
		font-weight: 400;
		width: 71%;
	}

	.scrollbar-container {
		height: 420px;
		width: 100%;
		overflow: hidden;
		overflow-y: scroll;
	}

	.scrollbar-container::-webkit-scrollbar {
		background-color: #53e82420;
		border-radius: 5px;
		width: 30px;
		border: 3px solid #4ac32420;
	}

	.scrollbar-container::-webkit-scrollbar-thumb {
		border-radius: 5px;
		background-color: #61377b;
		border: 1px solid #000;
	}

	h2 {
		text-align: center;
		margin-bottom: 16px;
	}

	ul.quiz-list {
		list-style-type: disc;
		border-radius: 20px;
		display: flex;
		margin-top: 0;
		flex-direction: column;
		padding: 16px;
	}

	li.quiz-list-item {
		background-color: rgba(0, 0, 0, 0);
		list-style-type: none;
		margin: 8px 0;
		width: 100%;
	}

	button.quiz-item {
		background-color: rgba(83, 232, 36, 0.34);
		border: 2px solid #61377b;
		border-radius: 5px;
		padding: 10px;
		font-size: 16px;
		cursor: pointer;
		width: 100%;
		text-align: left;
	}

	button.quiz-item:hover {
		background-color: #f0f0f0;
	}

	button.quiz-item:focus {
		outline: none;
		box-shadow: 0 0 0 2px #61377b;
	}

	@media (max-width: 991px) {
		.quiz-list {
			padding: 12px;
		}
		
		.profile-content {
			flex-direction: column;
			align-items: center;
		}
		
		.quiz-section {
			width: 100%;
			padding: 0 20px;
		}
		
		.scrollbar-container {
			height: auto;
			max-height: 420px;
		}
	}
</style>
