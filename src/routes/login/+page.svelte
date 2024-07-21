<script lang="ts">
	import { login, getNickName } from '$lib/firebase/fitebase';
	import { navigate } from 'svelte-routing';
	import { onMount } from 'svelte';
	let username: string = '';
	let password: string = '';

	onMount(async () => {
		if (localStorage.getItem('log') && (await getNickName(localStorage.getItem('log'))) !== null) {
			// navigate("/main");
			location.reload();
		}
	});

	async function handleSubmit() {
		let result = await login(username, password);

		if (!result.passed) alert(result.msg);
		else {
			localStorage.setItem('log', result.msg);
			navigate('/main');
			location.reload();
		}
	}
</script>

<div class="container">
	<h1>Login</h1>
	<form>
		<form on:submit|preventDefault={handleSubmit}>
			<label>
				Username:
				<input type="text" bind:value={username} />
			</label>
			<label>
				Password:
				<input type="password" bind:value={password} />
			</label>
			<button type="submit">Login</button>
		</form>
	</form>
	<p>Don't have an account? <a href="/register">Register</a></p>
</div>

<svelte:head>
	<title>Login</title>
	<style>
		body {
			background-color: #1d1f20;
			font-family: Arial, sans-serif;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100vh;
			margin: 0;
		}
		.container {
			background-color: #2d2f30;
			padding: 20px;
			border-radius: 10px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			width: 300px;
			text-align: center;
		}
		h1 {
			color: #80ff00;
		}
		input {
			width: calc(100% - 20px);
			padding: 10px;
			margin: 10px 0;
			border-radius: 5px;
			border: none;
			outline: none;
		}
		button {
			background-color: #80ff00;
			color: #000;
			padding: 10px;
			border: none;
			border-radius: 5px;
			cursor: pointer;
			width: calc(100% - 20px);
			margin: 10px 0;
		}
		a {
			color: #80ff00;
			text-decoration: none;
		}
		a:hover {
			text-decoration: underline;
		}
	</style>
</svelte:head>
