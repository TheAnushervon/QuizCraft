<script lang="ts">
	export let title: string;

	function viewStatistics(): void {}
</script>

<div class="quiz-item">
	<h3 class="quiz-title">{title}</h3>
	<button class="statistics-button" on:click={viewStatistics}> Statistic </button>
</div>

<style>
	.quiz-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 16px;
		font-family: Kanit, sans-serif;
		border-radius: 20px;
		background-color: rgba(137, 33, 194, 0.26);
		padding: 16px;
	}

	.quiz-title {
		font-size: 28px;
		color: #fff;
		text-decoration: underline;
		text-underline-offset: 8px;
	}

	.statistics-button {
		font-family: Kanit, sans-serif;
		border-radius: 20px;
		background-color: rgba(83, 232, 36, 0.53);
		color: #fff;
		padding: 8px 20px;
		font-size: 24px;
		border: none;
		cursor: pointer;
	}

	@media (max-width: 991px) {
		.quiz-item {
			flex-wrap: wrap;
		}

		.quiz-title {
			font-size: 20px;
		}

		.statistics-button {
			font-size: 18px;
			padding: 6px 12px;
			margin-top: 6px;
		}
	}
</style>
