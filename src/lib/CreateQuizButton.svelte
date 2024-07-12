<script lang="ts">
	
	import { Router, Link, Route } from "svelte-routing";
	import {goto} from '$app/navigation';
	function createNewQuiz(): void {}
	function PassNewQuiz(): void {
		goto('/easy-quiz'); 
	}
</script>

<button class="create-quiz-button" on:click={createNewQuiz}> Create new quiz </button>
<button class="pass-new-quiz" on:click={PassNewQuiz}>Pass-new-quiz</button>

<style>
	.create-quiz-button, .pass-new-quiz {
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

	@media (max-width: 991px) {
		.create-quiz-button {
			font-size: 20px;
			padding: 8px 16px;
		}
	}
</style>
