<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import { goto } from '$app/navigation';
	import { logout } from './firebase/fitebase';
	let open = false;
	let clicked = 'Nothing yet.';

	function handleLogout(): void {
		open = true;
	}

	function handleDialogClick(choice: string): void {
		clicked = choice;
		open = false;
		if (choice === 'Yes') {
			goto('/');
			logout(localStorage.getItem('log'));
		}
	}

	function gotoAbout(): void {
		goto('/about');
	}
</script>

<Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
	<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
	<Title id="simple-title">System-Message</Title>
	<Content id="simple-content">Are you sure to log out?</Content>
	<Actions>
		<Button on:click={() => handleDialogClick('No')}>
			<Label>No</Label>
		</Button>
		<Button on:click={() => handleDialogClick('Yes')}>
			<Label>Yes</Label>
		</Button>
	</Actions>
</Dialog>

<header class="profile-header">
	<a href="/" class="link"> <h1 class="logo">Quiz<span class="logo-highlight">Craft</span></h1></a>
	<div class="both">
		<button class="about-button" on:click={gotoAbout}>About</button>
		<button class="logout-button" on:click={handleLogout}>Log out</button>
	</div>
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

	.about-button {
		border-radius: 20px;
		/* background-color: rgba(137, 33, 194, 0.5); */
		/* color: #fff; */
		padding: 12px 40px;
		font:
			28px Kanit,
			sans-serif;
		border: none;
		cursor: pointer;
		margin-right: 10px;
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
