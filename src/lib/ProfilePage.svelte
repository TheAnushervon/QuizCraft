<script lang="ts">
	import ProfileHeader from './ProfileHeader.svelte';
	import UserInfo from './UserInfo.svelte';
	import QuizList from './QuizList.svelte';
	import CreateQuizButton from './CreateQuizButton.svelte';
	export let data;
</script>

<div class="profile-content">
	<UserInfo />
	<div class="quiz-section">
		<h2 class="quiz-section-title">Your quizzes</h2>
		<QuizList {data} />
		<CreateQuizButton />
	</div>
</div>

<style>
	
	
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

	.quiz-section-title {
		font-family: Kanit, sans-serif;
		margin-bottom: 16px;
	}

	@media (max-width: 991px) {
		.profile-page {
			padding: 16px;
		}

		.profile-content {
			flex-direction: column;
		}

		.quiz-section {
			font-size: 20px;
			width: 100%;
		}

		.quiz-section-title {
			font-size: 24px;
		}
	}
</style>
