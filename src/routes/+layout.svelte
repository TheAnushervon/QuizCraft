<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    // import '../lib/global.css';

    let currentPageTitle = '';
  
    onMount(() => {
      $page.data.title && (currentPageTitle = $page.data.title);
    });
  </script>
  
  <style>
   
  </style>
  <slot />
<!--   
  <div class="profile-page">
    <slot />
  </div> -->