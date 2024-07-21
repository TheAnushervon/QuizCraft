<script lang="ts">
	import { db, auth } from './firebase/fitebase';
	import { collection, query, where, getDocs } from 'firebase/firestore';
	import { getNickName } from './firebase/fitebase';
	import { type Quiz } from './quiz';
	import { onMount } from 'svelte';

	export let quizzes: Quiz[] = [];
	export let some: Quiz[] = [];

	async function fetchUserQuizzes() {
		if (localStorage.getItem('log') && (await getNickName(localStorage.getItem('log'))) !== null) {
			let nickname = await getNickName(localStorage.getItem('log'));
			console.log(nickname);
			const q = query(collection(db, 'quizzes'), where('user_nickname', '==', nickname));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				const quizData = doc.data() as Omit<Quiz, 'id'>;
				quizzes.push({ ...quizData, id: doc.id });
			});
			console.log(quizzes);
			some = quizzes;
		} else {
			console.log('not found');
		}
	}
	onMount(async () => {
		await fetchUserQuizzes();
	});
</script>

<main class="user-quizzes">
	<h1>Your Quizzes</h1>

	{#if quizzes.length > 0}
		{#each quizzes as quiz, index}
			<!-- <div class="quiz-item">
				<h2>Quiz: {quiz.user_nickname}</h2>
				{#each quiz.questions as question, questionIndex}
					<div class="question-item">
						<h3>Question {questionIndex + 1}: {question.question}</h3>
						{#each question.variants as variant, variantIndex}
							<div class="variant-item">
								<p>
									{variantIndex + 1}. {variant.text}
									{variant.isCorrect ? '(Correct)' : ''}
								</p>
							</div>
						{/each}
					</div>
				{/each}
			</div> -->
			<li>
				<a href="get-quiz/{[index]}">{quizzes[index].id}</a>
			</li>
		{/each}
	{:else}
		<p>No quizzes found.</p>
	{/if}

	<!-- {quizzes[0].questions[0].question} -->
	<!-- <script>
		console.log(quizzes[0]);
		console.log(quizzes);
	</script> -->
	<!-- {#each quizzes as quiz}
		<div class="quiz-item">
			<h2>hi</h2>
			<h2>{quiz.questions[0].question}</h2>
		</div>
	{/each} -->
</main>
