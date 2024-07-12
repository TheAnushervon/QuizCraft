import { writable, derived, type Writable } from 'svelte/store';

interface ApiItem {
    question?: {
        strQuestion: string;
    };
}

export const apiData: Writable<ApiItem[]> = writable([]);

export const api_questions = derived(apiData, ($apiData: ApiItem[]) => {
    return $apiData.map(item => item.question?.strQuestion || null).filter(Boolean) as string[];
});
