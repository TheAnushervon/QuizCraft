<script lang="ts">
    import Button from '@smui/button'; 
	import CheckLogin from '$lib/CheckLogin.svelte';

</script>
<CheckLogin>
    <Button on:click={() => alert('Really')}>Click Me</Button>
</CheckLogin>