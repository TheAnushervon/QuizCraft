export interface Quiz {
	id: string;
	user_nickname: string;
	questions: {
		question: string;
		variants: {
			text: string;
			isCorrect: boolean;
		}[];
	}[];
}
