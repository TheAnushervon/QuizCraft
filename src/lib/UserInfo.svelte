<script lang="ts">
	import { getNickName } from './firebase/fitebase';
	// export let name: string = 'Name';
	export let imageUrl: string = './profile.svg';
	import { onMount } from 'svelte';
	export let name: string | null = '';
	onMount(async () => {
		name = await getNickName(localStorage.getItem('log'));
	});
</script>

<section class="user-info">
	<img src={imageUrl} alt="User profile" class="user-avatar" />
	<h2 class="user-name">{name}</h2>
</section>

<style>
	.user-info {
		display: flex;
		flex-direction: column;
		font-size: 28px;
		font-weight: 400;
		text-align: center;
		align-items: center;
		width: 29%;
	}

	.user-avatar {
		object-fit: cover;
		width: 80%;
		border: 2px solid rgba(137, 33, 194, 1);
		border-radius: 50%;
	}

	.user-name {
		color: #53e824;
		font-family: Kanit, sans-serif;
		margin-top: 12px;
		font-size: 32px;
	}

	@media (max-width: 991px) {
		.user-info {
			font-size: 20px;
			width: 100%;
		}

		.user-name {
			font-size: 24px;
		}
	}
</style>
