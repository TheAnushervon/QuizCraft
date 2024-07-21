<script lang="ts">
	import { Router, Link, Route } from 'svelte-routing';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '@smui/button';
	import TextField from '@smui/textfield';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';

	let categories = ['bash', 'Linux', 'uncategorized', 'Docker', 'CMS', 'Code', 'DevOps'];
	let dialogOpen = false;
	let value = '';
	let count = 0;

	function closeDialog() {
		dialogOpen = false;
	}
	function Generate() {
		const url = `/quiz?limit=${count}&category=${value}`;
		goto(url);
	}

	function createNewQuiz(): void {
		goto('/quiz-creation');
	}

	function PassNewQuiz(): void {
		goto('/easy-quiz');
	}

	function LinuxQuiz(): void {
		goto('Linux-quiz');
	}
	function TestQuiz(): void {
		goto('testquiz');
	}
</script>

<!-- <Button on:click={() => dialogOpen = true}>Pass new Quiz</Button> -->

<Dialog bind:open={dialogOpen}>
	<Title>Quiz generating</Title>
	<Content>
		<div class="content">
			<div>
				<label for="category-questions">Category of Questions</label>
				<select bind:value id="category-questions">
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="count">Number of questions</label>
				<input type="number" min="1" max="20" step="1" bind:value={count} id="count" />
			</div>
		</div>
	</Content>
	<Actions>
		<Button on:click={closeDialog}>Close</Button>

		<Button on:click={Generate}>Generate</Button>
	</Actions>
</Dialog>
<button class="pass-new-quiz" on:click={() => (dialogOpen = true)}>Pass New Quiz</button>
<button class="create-quiz-button" on:click={createNewQuiz}>Create Quiz</button>
<button class="random-quiz" on:click={PassNewQuiz}>Random-quiz</button>
<button class="pass-linux" on:click={LinuxQuiz}>Linux-quiz</button>
<button class="test-quiz" on:click={TestQuiz}>TestQuiz</button>

<style>
	.create-quiz-button,
	.random-quiz,
	.pass-linux,
	.test-quiz,
	.pass-new-quiz {
		font-family: Kanit, sans-serif;
		border-radius: 20px;
		background-color: rgba(83, 232, 36, 0.53);
		color: #fff;
		margin-top: 20px;
		padding: 12px 24px;
		font-size: 28px;
		border: none;
		cursor: pointer;
		text-align: center;
	}

	:global(.smui-dialog__surface) {
		width: 100vw;
		height: 100vh;
		max-width: 100vw;
		max-height: 100vh;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	:global(.smui-dialog__title) {
		flex-shrink: 0;
	}

	:global(.smui-dialog__content) {
		flex-grow: 1;
		overflow-y: auto;
		padding: 1rem;
	}

	:global(.smui-dialog__actions) {
		flex-shrink: 0;
		display: flex;
		justify-content: flex-end;
		padding: 1rem;
	}

	/* .input-field {
		margin-bottom: 1rem;
	} */

	@media (max-width: 991px) {
		.create-quiz-button {
			font-size: 20px;
			padding: 8px 16px;
		}
	}
</style>
