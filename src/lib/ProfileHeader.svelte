<script lang="ts">
	function handleLogout(): void {}
</script>

<header class="profile-header">
	<h1 class="logo">Quiz<span class="logo-highlight">Craft: profile</span></h1>
	<button class="logout-button" on:click={handleLogout}>Log out</button>
</header>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
	.profile-header {
		display: flex;
		width: 100%;
		max-width: 1400px;
		justify-content: space-between;
		align-items: center;
		font-weight: 400;
	}

	.logo {
		color: #53e824;
		font:
			48px 'Kanit',
			sans-serif;
	}

	.logo-highlight {
		color: #8921c2;
	}

	.logout-button {
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

	@media (max-width: 991px) {
		.profile-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.logo {
			font-size: 32px;
			margin-bottom: 12px;
		}

		.logout-button {
			font-size: 20px;
			padding: 8px 16px;
		}
	}
</style>
