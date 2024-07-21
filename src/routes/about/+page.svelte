<script lang="ts">
	import Button, { Label } from '@smui/button';
</script>

<main>
	<a href="/">
		<h2><span class="purple">Quiz</span><span class="lime">Craft</span></h2>
	</a>
	<p>
		On our website you can <span class="lime">create your own quizzes</span>, share them and
		<span class="purple">take others</span>. Enjoy!
	</p>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(26, 26, 26, 1) 100%);
		color: white;
		font-family: 'Kanit', sans-serif;
		text-align: center;
	}

	h2 {
		font-size: 36px;
		margin-bottom: 20px;
	}

	p {
		font-size: 18px;
		margin-bottom: 40px;
	}

	span {
		font-weight: bold;
	}

	.purple {
		color: purple;
	}

	.lime {
		color: lime;
	}
	a {
		text-decoration: none;
	}
</style>
