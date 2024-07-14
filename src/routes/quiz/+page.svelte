<script lang="ts">
	import { onMount } from 'svelte';
	import { apiData } from './store.js';

	interface Answer {
		answer_a: string | null;
		answer_b: string | null;
		answer_c: string | null;
		answer_d: string | null;
		answer_e: string | null;
		answer_f: string | null;
	}
	interface Question {
		id: number;
		question: string;
		answers: Answer;
	}

	let limit: string | null = null;
	let category: string | null = null;

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		limit = params.get('limit');
		category = params.get('category');

		if (limit && category) {
			try {
				const response = await fetch(
					`https://quizapi.io/api/v1/questions?apiKey=d8nX9BRGAPjzL1ugpVHa8uCdstHXS0rnyRT4GTz5&limit=${limit}&category=${category}`
				);
				const data = await response.json();
				console.log(data);
				apiData.set(data);
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log('Missing limit or category parameter');
		}
	});
</script>

<main>
	<h1>Quiz questions:</h1>
	<ul>
		{#each $apiData as question (question.id)}
			<li>
				<h2>{question.question}</h2>
				<ul>
					{#each Object.entries(question.answers) as [key, answer]}
						{#if answer}
							<li>{key}: {answer}</li>
						{/if}
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</main>

<style>
	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		margin-bottom: 1em;
	}

	h2 {
		margin-bottom: 0.5em;
	}

	h1 {
		margin-bottom: 1em;
	}
</style>
