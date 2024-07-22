<script lang="ts">
	import { goto } from '$app/navigation';
	function gotoAbout(): void {
		goto('/about');
	}

	function gotoProfile(): void {
		goto('/main');
	}
</script>

<header class="quiz-header">
	<a href="/" class="link"> <h1 class="logo">Quiz<span class="logo-highlight">Craft</span></h1></a>
	<div class="both">
		<button class="about-button" on:click={gotoAbout}>About</button>
		<button class="profile-button" on:click={gotoProfile}>Profile</button>
	</div>
</header>

<style>
	.quiz-header {
		display: flex;
		width: 100%;
		max-width: 1400px;
		justify-content: space-between;
		align-items: center;
		font-weight: 400;
	}

	.link {
		text-decoration: none;
	}

	.logo {
		color: #53e824;
		font:
			48px 'Kanit',
			sans-serif;
		text-decoration: none;
	}

	.logo-highlight {
		color: #8921c2;
	}
	.about-button {
		border-radius: 20px;
		/* background-color: rgba(137, 33, 194, 0.5); */
		/* color: #fff; */
		padding: 12px 20px;
		font:
			28px Kanit,
			sans-serif;
		border: none;
		cursor: pointer;
		margin-right: 10px;
	}
	.both {
		padding-left: 40px;
	}
	.profile-button {
		border-radius: 20px;
		background-color: rgba(137, 33, 194, 0.5);
		color: #fff;
		padding: 12px 20px;
		font:
			28px Kanit,
			sans-serif;
		border: none;
		cursor: pointer;
	}
</style>
