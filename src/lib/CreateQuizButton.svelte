<script lang="ts">
	function createNewQuiz(): void {}
</script>

<button class="create-quiz-button" on:click={createNewQuiz}> Create new quiz </button>

<style>
	.create-quiz-button {
		font-family: Kanit, sans-serif;
		border-radius: 20px;
		background-color: rgba(83, 232, 36, 0.53);
		color: #fff;
		padding: 12px 24px;
		font-size: 28px;
		border: none;
		cursor: pointer;
		text-align: center;
		margin-bottom: 32px;
	}

	@media (max-width: 991px) {
		.create-quiz-button {
			font-size: 20px;
			padding: 8px 16px;
		}
	}
</style>
