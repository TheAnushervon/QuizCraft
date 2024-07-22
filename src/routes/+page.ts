import { db } from '$lib/firebase/fitebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getNickName } from '$lib/firebase/fitebase';
import { type Quiz } from '$lib/quiz';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const quizzes: Quiz[] = [];
	// #TODO: params.id
	if (
		typeof localStorage !== 'undefined' &&
		localStorage.getItem('log') &&
		(await getNickName(localStorage.getItem('log'))) !== null
	) {
		const nickname = await getNickName(localStorage.getItem('log'));
		console.log(nickname);
		const q = query(collection(db, 'quizzes'), where('user_nickname', '==', nickname));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			const quizData = doc.data() as Omit<Quiz, 'id'>;
			quizzes.push({ ...quizData, id: doc.id });
		});
		console.log(quizzes);
	} else {
		console.log('not found');
	}

	// const found_quiz = quizzes.find((quiz) => quiz.id === params.id);

	return {
		quizzes: quizzes
	};
}
