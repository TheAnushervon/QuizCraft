<script lang="ts">
	import QuizHeader from './QuizHeader.svelte';
	interface Variant {
		text: string;
		isCorrect: boolean;
		isSelected: boolean;
	}

	interface Question {
		question: string;
		variants: Variant[];
	}

	export let data;

	let quizName = '';

	let currentQuestionIndex = 0;
	let questions: Question[] = [];

	if (data != undefined) {
		console.log(data.quiz);
		quizName = data.quiz.name;
		questions = data.quiz.questions;
		console.log(questions);
	}

	questions.forEach((question) => {
		question.variants.forEach((variant) => {
			variant.isSelected = false;
		});
	});

	let correctAnswers = 0;
	let showResults = false;

	function nextQuestion() {
		if (currentQuestionIndex < questions.length - 1) {
			currentQuestionIndex++;
		} else {
			showResults = true;
		}
	}

	function selectVariant(questionIndex: number, variantIndex: number) {
		questions[questionIndex].variants = questions[questionIndex].variants.map((variant, index) =>
			index === variantIndex ? { ...variant, isSelected: !variant.isSelected } : variant
		);
	}

	function checkAnswer() {
		const currentQuestion = questions[currentQuestionIndex];
		const selectedVariants = currentQuestion.variants.filter((variant) => variant.isSelected);
		const correctVariants = currentQuestion.variants.filter((variant) => variant.isCorrect);
		if (
			selectedVariants.length === correctVariants.length &&
			selectedVariants.every((variant) => variant.isCorrect)
		) {
			correctAnswers++;
		}

		console.log(questions);
		nextQuestion();
	}
</script>

<body style="margin: 0;">
	{#if showResults}
		<div class="results">
			<p>You answered {correctAnswers} out of {questions.length} questions correctly.</p>
		</div>
	{:else}
		<main class="quiz-taking">
			<QuizHeader />
			<section class="name-section">
				<div class="name-quiz">Quiz Name:</div>
				<p class="name-text">{quizName}</p>
			</section>
			<section class="question-section">
				<div class="question-number">{currentQuestionIndex + 1}.</div>
				<p class="question-text">{questions[currentQuestionIndex].question}</p>
			</section>
			<div class="variants-container">
				{#each questions[currentQuestionIndex].variants as variant, index (index)}
					<label class="variant-label">
						<input
							type="checkbox"
							name="variant"
							checked={variant.isSelected}
							on:click={() => selectVariant(currentQuestionIndex, index)}
						/>
						<!-- <VariantItem {variant} /> -->
						<div class="variant-item">
							<p class="variant-text">{variant.text}</p>
						</div>
					</label>
				{/each}
			</div>
			<button class="answer-button" on:click={checkAnswer}>Answer</button>
		</main>
	{/if}
</body>

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
		/* justify-content: center; */
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

	.name-section {
		display: flex;
		align-items: center;
		align-self: center;
		margin: 0 0 10px 6px;
		width: 100%;
		max-width: 700px;
	}

	.name-quiz {
		color: #fff;
		font-family: Kanit, sans-serif;
		font-size: 28px;
		font-weight: 400;
		margin-right: 10px;
		border-bottom: 1px solid #fff;
	}

	.name-text {
		color: #fff;
		font-family: Kanit, sans-serif;
		font-size: 28px;
		font-weight: 400;
		background: transparent;
		border: none;
		/* width: 100%; */
		padding: 5px 0;
	}

	.question-section {
		display: flex;
		align-items: center;
		align-self: center;
		margin: 0 0 0 6px;
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
		align-self: right;
		border: none;
		/* padding: 5px 0; */
	}

	.variants-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 700px;
		/* margin-top: 20px; */
		/* padding-left: 55%; */
	}

	.variant-label {
		display: flex;
		align-items: center;
		/* margin-bottom: 10px; */
		cursor: pointer;
		padding-left: 10px;
	}

	.variant-item {
		display: flex;
		justify-content: space-between;
		width: 10%;
		max-width: 10%;
		padding-left: 16px;
		/* gap: 20px; */
		/* margin-top: 10px; */
	}

	.variant-text {
		color: #f5f5f5;
		font-family: Kanit, sans-serif;
		font-size: 24px;
		font-weight: 400;
		background: transparent;
		border: none;
		margin: 10px;
		/* flex-grow: 1; */
	}

	.variant-text:hover {
		outline: none;
		color: #44cc2b;
		/* border-bottom: 1px solid #fff; */
	}

	.answer-button {
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

	.answer-button:hover {
		background-color: #44cc2b;
	}

	@media (max-width: 991px) {
		.variants-container {
			padding-left: 10%;
		}
	}
</style>
