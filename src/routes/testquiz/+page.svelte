<!-- App.svelte -->
<script>
	let dialogOpen = false;
	let numberOfQuestions = 0;
	let count = 0;

	let categories = ['bash', 'Linux', 'uncategorized', 'Docker', 'CMS', 'Code', 'DevOps'];

	function closeDialog() {
		dialogOpen = false;
	}
	console.log(numberOfQuestions);
</script>

<div class="dialog-overlay">
	<div class="dialog">
		<h2>Popup Title</h2>
		<div class="content">
			<div>
				<label for="number-of-questions">Number of Questions</label>
				<select bind:value={numberOfQuestions} id="number-of-questions">
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="count">Count</label>
				<input type="number" bind:value={count} id="count" />
			</div>
		</div>
		<div class="actions">
			<button on:click={closeDialog}>Close</button>
			<button on:click={closeDialog}>Generate</button>
		</div>
	</div>
</div>

<style>
	.dialog-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dialog {
		background-color: white;
		padding: 1rem;
		border-radius: 0.25rem;
		max-width: 90%;
	}

	.content {
		margin: 1rem 0;
	}

	.content div {
		margin-bottom: 0.5rem;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
	}

	.actions button {
		margin-left: 0.5rem;
	}
</style>
