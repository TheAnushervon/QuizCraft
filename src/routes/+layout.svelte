<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import ProfileHeader from '$lib/ProfileHeader.svelte';
	
	// import '../lib/global.css';

	let currentPageTitle = '';

	onMount(() => {
		$page.data.title && (currentPageTitle = $page.data.title);
	});
</script>

<body style="margin: 0;">
	<main class="profile-page">
		<ProfileHeader />
		<slot />
	</main>
</body>
<style>
	.profile-page {
		background: radial-gradient(
			161.81% 143.28% at 26.61% 20.97%,
			#242824 37.47%,
			rgba(83, 232, 36, 0.34) 100%
		);
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		box-sizing: border-box;
	}
	@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>
