<script lang="ts">
	import { onMount } from 'svelte';
	import { getNickName } from '$lib/firebase/fitebase';
	import { navigate } from 'svelte-routing';
	import { writable, type Writable } from 'svelte/store';

	export const dataStore: Writable<boolean> = writable(false);
	onMount(async () => {
		if (
			(localStorage.getItem('log') && (await getNickName(localStorage.getItem('log'))) === null) ||
			!localStorage.getItem('log')
		) {
			navigate('/login');
			location.reload();
		} else dataStore.set(true);
	});
</script>

{#if $dataStore}
	<main>
		<slot />
	</main>
{/if}
