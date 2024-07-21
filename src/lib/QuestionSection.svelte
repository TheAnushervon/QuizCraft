<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let question: string;
	export let number: number;
	const dispatch = createEventDispatcher();

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		dispatch('update', target.value);
	}
</script>

<section class="question-section">
	<div class="question-number">{number}.</div>
	<input
		type="text"
		class="question-text"
		value={question}
		placeholder="Question"
		on:input={handleInput}
	/>
</section>

<style>
	.question-section {
		display: flex;
		align-items: center;
		align-self: center;
		margin: 45px 0 10px 6px;
		width: 100%;
		max-width: 700px;
	}

	.question-number {
		color: #fff;
		font-family: Kanit, sans-serif;
		font-size: 28px;
		font-weight: 400;
		margin-right: 10px;
	}

	.question-text {
		color: #fff;
		font-family: Kanit, sans-serif;
		font-size: 28px;
		font-weight: 400;
		background: transparent;
		border: none;
		width: 100%;
		padding: 5px 0;
	}

	.question-text:focus {
		outline: none;
		border-bottom: 1px solid #fff;
	}
</style>
