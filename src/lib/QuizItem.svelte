<script lang="ts">
	export let title: string;
	export let id: string;
</script>

<a href={`/quizzes/${id}`} class="quiz-item">
	<h3 class="quiz-title">{title}</h3>
</a>

<style>
	.quiz-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: Kanit, sans-serif;
		border-radius: 20px;
		background-color: rgba(137, 33, 194, 0.26);
		padding: 16px;
		text-decoration: none;
	}

	.quiz-title {
		font-size: 28px;
		color: #fff;
		text-decoration: underline;
		text-underline-offset: 8px;
	}

	@media (max-width: 991px) {
		.quiz-item {
			flex-wrap: wrap;
		}

		.quiz-title {
			font-size: 20px;
		}
	}
</style>
