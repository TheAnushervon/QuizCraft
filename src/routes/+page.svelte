<script lang="ts">
	import Button, {Label} from '@smui/button';
	import { onMount } from 'svelte';
	import { navigate } from 'svelte-routing';
	onMount(() =>{
		document.getElementById('log')?.addEventListener("click", () => {
			navigate("/login");
			location.reload();
		});
		document.getElementById('reg')?.addEventListener("click", () => {
			navigate("/register");
			location.reload();
		});
	})
</script>

<style>
	:global(.my-colored-button) {
		margin-right: 50px;

		/* background-color: green; */
	}
	:global(.my-colored-button-reg) {
		margin-left: 50px;

		/* background-color: green; */
	}
</style>

<main>
<h2>QuizCraft</h2> <br>
<h3>Some bio</h3>
<div>
<Button class="my-colored-button" variant="outlined" style="color:green" id="log">
	<Label>Log in</Label>
</Button>
Or
<Button class="my-colored-button-reg" variant="outlined" style="color:green" id="reg">
	<Label>Register</Label>
</Button>
</div>
</main>

