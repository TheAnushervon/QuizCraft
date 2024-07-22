<script lang="ts">
    import { onMount } from "svelte";
    import { apiData, api_questions } from "./store.ts";
	import CheckLogin from "$lib/CheckLogin.svelte";

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
		correct_answers: { [key: string]: string };
	}

	let selectedAnswers: { [key: number]: string } = {};
	let showResults = false;
	let correctAnswers = 0;

	onMount(async () => {
		try {
			const response = await fetch(
				'https://quizapi.io/api/v1/questions?apiKey=d8nX9BRGAPjzL1ugpVHa8uCdstHXS0rnyRT4GTz5&limit=100&category=Linux'
			);
			const data = await response.json();
			console.log(data);
			apiData.set(data);
		} catch (error) {
			console.log(error);
		}
	});

	function selectAnswer(questionId: number, answerKey: string) {
		selectedAnswers = { ...selectedAnswers, [questionId]: answerKey };
	}

	function saveResults() {
		correctAnswers = 0;
		$apiData.forEach((question: Question) => {
			const selectedAnswer = selectedAnswers[question.id];
			if (selectedAnswer && question.correct_answers[selectedAnswer + "_correct"] === "true") {
				correctAnswers++;
			}
		});
		showResults = true;
	}
</script>

<CheckLogin>
    {#if showResults}
    <div class="results-container">
        <div class="results">
            <p>You answered {correctAnswers} out of {$apiData.length} questions correctly.</p>
            <div class="results-circles">
                {#each $apiData as question, index}
                    <div class="result-circle {selectedAnswers[question.id] && question.correct_answers[selectedAnswers[question.id] + '_correct'] === 'true' ? 'correct' : 'incorrect'}"></div>
                {/each}
            </div>
        </div>
    </div>
    {:else}
    <main>
        <h1>Quiz questions:</h1>
        <ul>
            {#each $apiData as question (question.id)}
                <li>
                    <h2>{question.question}</h2>
                    <ul>
                        {#each Object.entries(question.answers) as [key, answer]}
                            {#if answer}
                                <li>
                                    <button 
                                        class="variant-button {selectedAnswers[question.id] === key ? 'selected' : ''}" 
                                        on:click={() => selectAnswer(question.id, key)}
                                    >
                                        {key}: {answer}
                                    </button>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                </li>
            {/each}
        </ul>
        <button class="save-button" on:click={saveResults}>Save Results</button>
    </main>
    {/if}
</CheckLogin>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Roboto', sans-serif;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		max-width: 100%;
		background: radial-gradient(
			161.81% 143.28% at 26.61% 20.97%,
			#242824 37.47%,
			rgba(83, 232, 36, 0.34) 100%
		);
		color: white;
		text-align: center;
		padding: 0 20px;
		box-sizing: border-box;
	}

	h1 {
		margin-bottom: 1em;
		font-family: Kanit, sans-serif;
		font-size: 28px;
		font-weight: 400;
	}

	h2 {
		margin-bottom: 0.5em;
		font-family: Kanit, sans-serif;
		font-size: 24px;
		font-weight: 400;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		margin-bottom: 1em;
	}

	.variant-button {
		color: #f5f5f5;
		font-family: Kanit, sans-serif;
		font-size: 24px;
		font-weight: 400;
		background: transparent;
		border: 2px solid #f5f5f5;
		border-radius: 5px;
		margin: 10px;
		padding: 10px;
		cursor: pointer;
		transition: background-color 0.3s, color 0.3s;
	}

	.variant-button:hover {
		color: #44cc2b;
		border-color: #44cc2b;
	}

	.variant-button.selected {
		background-color: #44cc2b;
		color: white;
	}

	.save-button {
		margin-top: 20px;
		padding: 10px 20px;
		background-color: #53e824;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 18px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.save-button:hover {
		background-color: #44cc2b;
	}

	.results-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background: radial-gradient(
			161.81% 143.28% at 26.61% 20.97%,
			#242824 37.47%,
			rgba(83, 232, 36, 0.34) 100%
		);
		color: white;
		text-align: center;
		border-radius: 10px;
	}

	.results {
		background-color: #44cc2b;
		padding: 20px;
		border-radius: 10px;
	}

	.results-circles {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	.result-circle {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		margin: 0 5px;
	}

	.correct {
		background-color: green;
	}

	.incorrect {
		background-color: red;
	}

	@media (max-width: 991px) {
		h1, h2 {
			font-size: 20px;
		}
		.variant-button {
			font-size: 20px;
			padding: 8px;
		}
		.save-button {
			font-size: 16px;
			padding: 8px 16px;
		}
	}
</style>
