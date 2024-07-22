<script lang="ts">
	import ProfileHeader from './ProfileHeader.svelte';
	import UserInfo from './UserInfo.svelte';
	import QuizList from './QuizList.svelte';
	import CreateQuizButton from './CreateQuizButton.svelte';
	export let data;
	export let name = '';
	if (data != undefined) {
		name = data.quizzes[0].user_nickname;
	}
</script>

<body style="margin: 0;">
	<main class="profile-page">
		<ProfileHeader />
		<div class="profile-content">
			<UserInfo {name} />
			<div class="quiz-section">
				<h2 class="quiz-section-title">Your quizzes</h2>
				<QuizList {data} />
				<CreateQuizButton />
			</div>
		</div>
	</main>
</body>

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
