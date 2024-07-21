<script lang="ts">
	import QuizHeader from './QuizHeader.svelte';
	import QuestionSection from './QuestionSection.svelte';
	import VariantItem from './VariantItem.svelte';
	import NavigationButtons from './NavigationButtons.svelte';
	import { db } from './firebase/fitebase';
	import {
		addDoc,
		collection,
		doc,
		setDoc,
		deleteDoc,
		query,
		where,
		getDocs
	} from 'firebase/firestore';
	import { getNickName } from './firebase/fitebase';
	import { goto } from '$app/navigation';

	export let data;

	interface Variant {
		text: string;
		isCorrect: boolean;
	}

	interface Question {
		question: string;
		variants: Variant[];
	}

	let currentQuestionIndex = 0;

	let questions: Question[] = [
		{
			question: '',
			variants: [
				{ text: '', isCorrect: true },
				{ text: '', isCorrect: false }
			]
		}
	];

	let quizName = '';
	let temp_quizName = quizName;
	if (data != undefined) {
		quizName = data.quiz.name;
		temp_quizName = data.quiz.name;
		questions = data.quiz.questions;
	}

	let quizNameError = '';
	let questionErrors: string[] = [];
	let variantErrors: string[] = [];

	function validateQuizName() {
		quizNameError = quizName ? '' : 'Quiz name cannot be empty';
		return !quizNameError;
	}

	function validateQuestion() {
		// questionErrors[index] = questions[index].question ? '' : 'Question cannot be empty';
		// return !questionErrors[index];
		let isValid = true;
		for (let i = 0; i < questions.length; i++) {
			questionErrors[i] = questions[i].question ? '' : 'Question cannot be empty';
			isValid = !questionErrors[i] && isValid;
			return isValid;
		}
	}

	function validateVariant() {
		let isValid = true;
		for (let i = 0; i < questions.length; i++) {
			for (let j = 0; j < questions[i].variants.length; j++) {
				isValid = !!questions[i].variants[j].text && isValid;
				console.log(questions[i].variants[j]);
			}
		}
		return isValid;
	}

	function validateVariantsAtLeastOnCorrect(questionIndex: number, variantIndex: number) {
		const hasCorrectVariant = questions[questionIndex].variants.some(
			(variant) => variant.isCorrect
		);
		variantErrors[questionIndex] = hasCorrectVariant ? '' : 'At least one variant must be correct';
		return !variantErrors[questionIndex];
	}

	function validateVariants() {
		let isValid = true;
		for (let i = 0; i < questions.length; i++) {
			for (let j = 0; j < questions[i].variants.length; j++) {
				isValid = validateVariantsAtLeastOnCorrect(i, j) && isValid;
			}
		}
		return isValid;
	}

	async function deleteQuiz(quizName: string) {
		goto('/main');
		const q = query(collection(db, 'quizzes'), where('name', '==', quizName));
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			const quizRef = doc(db, 'quizzes', querySnapshot.docs[0].id);
			try {
				await deleteDoc(quizRef);
				console.log('Quiz deleted successfully');
			} catch (error) {
				console.error('Error deleting quiz', error);
			}
		} else {
			console.log('Quiz not found');
		}
	}

	async function releaseQuiz() {
		if (!validateQuizName()) {
			alert('Quiz name cannot be empty');
		} else if (!validateQuestion()) {
			alert('Question cannot be empty, recheck please and delete unnecessary ones');
		} else if (!validateVariant()) {
			alert('Variant cannot be empty, recheck please and remove unnecessary ones');
		} else if (!validateVariants()) {
			alert('At least one variant should be correct in each question');
		} else {
			goto('/main');
			let nickname = await getNickName(localStorage.getItem('log'));

			const quizData = {
				user_nickname: nickname,
				name: quizName,
				questions: questions.map((question) => ({
					question: question.question,
					variants: question.variants.map((variant) => ({
						text: variant.text,
						isCorrect: variant.isCorrect
					}))
				}))
			};

			const q = query(collection(db, 'quizzes'), where('name', '==', quizName));
			const querySnapshot = await getDocs(q);

			if (querySnapshot.empty) {
				try {
					await addDoc(collection(db, 'quizzes'), quizData);
					quizName = quizData.name;
					console.log('Quiz released successfully');
				} catch (error) {
					console.error('Error releasing quiz', error);
				}
			} else {
				const quizRef = doc(db, 'quizzes', querySnapshot.docs[0].id);
				try {
					await setDoc(quizRef, quizData, { merge: true });
					console.log('Quiz updated successfully');
				} catch (error) {
					console.error('Error updating quiz', error);
				}
			}
		}
	}

	function addVariant(questionIndex: number) {
		questions[questionIndex].variants = [
			...questions[questionIndex].variants,
			{ text: '', isCorrect: false }
		];
	}

	function toggleCorrectness(questionIndex: number, variantIndex: number) {
		questions[questionIndex].variants[variantIndex].isCorrect =
			!questions[questionIndex].variants[variantIndex].isCorrect;
	}

	function nextQuestion() {
		if (currentQuestionIndex < questions.length - 1) {
			currentQuestionIndex++;
		}
	}

	function deleteVariant(questionIndex: number, variantIndex: number) {
		questions[questionIndex].variants = questions[questionIndex].variants.filter(
			(_, index) => index !== variantIndex
		);
	}

	function deleteQuestion(questionIndex: number) {
		if (questions.length > 1) {
			questions = questions.filter((_, index) => index !== questionIndex);
			if (currentQuestionIndex >= questions.length) {
				currentQuestionIndex = questions.length - 1;
			}
		}
	}

	function addQuestion() {
		questions = [
			...questions,
			{
				question: '',
				variants: []
			}
		];
		currentQuestionIndex = questions.length - 1;
	}

	function previousQuestion() {
		if (currentQuestionIndex > 0) {
			currentQuestionIndex--;
		}
	}

	function updateQuestion(questionIndex: number, newQuestion: string) {
		questions[questionIndex].question = newQuestion;
		questions = [...questions];
	}

	function updateVariant(questionIndex: number, variantIndex: number, newText: string) {
		questions[questionIndex].variants[variantIndex].text = newText;
		questions = [...questions];
	}
	console.log(questions);
</script>

<main class="quiz-creation">
	<QuizHeader />
	<section class="name-section">
		<div class="name-quiz">Quiz Name:</div>
		<input type="text" class="name-text" placeholder="Enter quiz name" bind:value={quizName} />
		<!-- <div class="error">{quizNameError}</div> -->
	</section>
	<QuestionSection
		number={currentQuestionIndex + 1}
		question={questions[currentQuestionIndex].question}
		on:update={(event) => updateQuestion(currentQuestionIndex, event.detail)}
	/>
	{#each questions[currentQuestionIndex].variants as variant, index (index)}
		<VariantItem
			{variant}
			on:click={() => toggleCorrectness(currentQuestionIndex, index)}
			on:update={(event) => updateVariant(currentQuestionIndex, index, event.detail)}
			on:delete={() => deleteVariant(currentQuestionIndex, index)}
		/>
	{/each}
	<button class="add-variant" on:click={() => addVariant(currentQuestionIndex)}>+ variant...</button
	>
	<div class="action-buttons">
		<button class="delete-button" on:click={() => deleteQuestion(currentQuestionIndex)}
			>Delete question</button
		>
		<button class="add-button" on:click={addQuestion}>Add question</button>
	</div>
	<NavigationButtons on:previous={previousQuestion} on:next={nextQuestion} />
	<button class="release-button" on:click={releaseQuiz}>Save</button>
	<button class="delete-quiz-button" on:click={() => deleteQuiz(temp_quizName)}>Delete Quiz</button>
</main>

<style>
	.quiz-creation {
		background: radial-gradient(
			161.81% 143.28% at 26.61% 20.97%,
			#242824 37.47%,
			rgba(83, 232, 36, 0.34) 100%
		);
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 28px;
		font-weight: 400;
		padding: 30px 35px;
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
	}

	.add-variant {
		color: #878787;
		font-family: Kanit, sans-serif;
		margin-top: 10px;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 28px;
	}

	.action-buttons {
		display: flex;
		margin-top: 15px;
		justify-content: space-between;
		width: 100%;
		max-width: 700px;
		/* gap: 300px; */
		font-size: 22px;
	}

	.delete-button,
	.add-button {
		font-family: Kanit, sans-serif;
		/* flex-grow: 1;
		flex-basis: auto; */
		background: none;
		border: none;
		cursor: pointer;
		font-size: 22px;
	}

	.delete-button {
		color: #8921c2;
	}

	.add-button {
		color: #53e824;
	}

	.release-button {
		font-family: Kanit, sans-serif;
		border-radius: 14px;
		background-color: rgba(83, 232, 36, 0.53);
		margin-top: 20px;
		color: #fff;
		padding: 13px 10px 6px;
		border: none;
		cursor: pointer;
		font-size: 28px;
		font-weight: 400;
	}

	.delete-quiz-button {
		font-family: Kanit, sans-serif;
		border-radius: 14px;
		background-color: rgba(228, 34, 17, 0.53);
		margin-top: 20px;
		color: #fff;
		padding: 13px 10px 6px;
		border: none;
		cursor: pointer;
		font-size: 28px;
		font-weight: 400;
	}

	.name-section {
		display: flex;
		align-items: center;
		align-self: center;
		margin: 45px 0 10px 6px;
		width: 100%;
		max-width: 700px;
	}

	.name-text {
		color: #fff;
		font-family: Kanit, sans-serif;
		font-size: 28px;
		font-weight: 400;
		background: transparent;
		border: none;
		width: 100%;
		padding: 5px 0;
	}

	.name-text:focus {
		outline: none;
		border-bottom: 1px solid #fff;
	}

	.name-quiz {
		color: #fff;
		font-family: Kanit, sans-serif;
		font-size: 28px;
		font-weight: 400;
		margin-right: 10px;
		width: 27.5%;
		border-bottom: 1px solid #fff;
	}
</style>
