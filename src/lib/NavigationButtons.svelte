<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handlePrevious() {
		dispatch('previous');
	}

	function handleNext() {
		dispatch('next');
	}
</script>

<nav class="navigation-buttons">
	<button class="back-button" on:click={handlePrevious}>
		<img
			src="https://cdn.builder.io/api/v1/image/assets/TEMP/af659283129e71c2d0c02f3d1381b9860bd3c97f49462d8a6a8298d5a72fd633?apiKey=efc40630970847e3af521230b391b267&"
			alt=""
			class="nav-icon"
		/>
		<span>back</span>
	</button>
	<button class="next-button" on:click={handleNext}>
		<span>next</span>
		<img
			src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b6103fe0227dfb075b3704b3d5309e092d3220a350e1cf85451bb63a77dba4f?apiKey=efc40630970847e3af521230b391b267&"
			alt=""
			class="nav-icon"
		/>
	</button>
</nav>

<style>
	.navigation-buttons {
		display: flex;
		margin-top: 13px;
		width: 100%;
		max-width: 670px;
		align-items: flex-start;
		gap: 10px;
		font-size: 22px;
	}

	.back-button,
	.next-button {
		display: flex;
		gap: 10px;
		align-items: center;
		background: none;
		border: none;
		cursor: pointer;
		font-family: Kanit, sans-serif;
		font-size: 22px;
	}

	.back-button {
		color: #8921c2;
	}

	.next-button {
		color: #53e824;
		margin-left: auto;
	}

	.nav-icon {
		width: 20px;
		height: 20px;
	}
</style>
