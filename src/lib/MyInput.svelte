<script>
    export let value = undefined;
    export let placeholder;
    export let label;
    export let name;
    export let id;
</script>

<label for={id}>{label}</label>
<input bind:value {placeholder} {id} {name} type="text" />