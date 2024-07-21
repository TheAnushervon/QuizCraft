<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let variant: { text: string; isCorrect: boolean };

	const dispatch = createEventDispatcher();

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		dispatch('update', target.value);
	}
	function handleDelete() {
		dispatch('delete');
	}
</script>

<div class="variant-item">
	<input
		type="text"
		class="variant-text"
		value={variant.text}
		placeholder="Variant"
		on:input={handleInput}
	/>
	<div class="status-container" on:click>
		<div class="status-indicator {variant.isCorrect ? 'correct' : 'incorrect'}">
			{variant.isCorrect ? 'Correct' : 'False'}
		</div>
	</div>

	<button class="delete-variant" on:click={handleDelete}
		><i class="fa fa-trash" aria-hidden="true"></i>
	</button>
</div>

<style>
	.variant-item {
		display: flex;
		justify-content: space-between;
		width: 700px;
		max-width: 100%;
		padding-left: 16px;
		gap: 20px;
		margin-top: 10px;
	}

	.delete-variant {
		background: transparent;
		color: white;
		border: none;
		font-size: 20px;
	}

	.delete-variant:hover {
		color: darkred;
	}

	.variant-text {
		color: #f5f5f5;
		font-family: Kanit, sans-serif;
		font-size: 28px;
		font-weight: 400;
		background: transparent;
		width: 100%;
		border: none;
		flex-grow: 1;
	}

	.variant-text:focus {
		outline: none;
		border-bottom: 1px solid #fff;
	}

	.status-container {
		display: flex;
		flex-direction: column;
		color: #fff;
		justify-content: center;
		padding: 1px 0;
		cursor: pointer;
	}

	.status-indicator {
		font-family: Kanit, sans-serif;
		border-radius: 14px;
		justify-content: center;
		padding: 12px 20px;
		font-size: 28px;
		font-weight: 400;
	}

	.correct {
		background-color: rgba(83, 232, 36, 0.53);
	}

	.incorrect {
		background-color: rgba(137, 33, 194, 0.5);
	}
</style>
