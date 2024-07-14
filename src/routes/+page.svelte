<script lang="ts">

import Button, {Label} from '@smui/button';
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
<Button class="my-colored-button" variant="unelevated" style="background-color:green" href='/login'>
	<Label>Log in</Label>
</Button>
Or
<Button class="my-colored-button-reg" variant="unelevated" style="background-color:green" href='/register'>
	<Label>Register</Label>
</Button>
</div>
</main>
