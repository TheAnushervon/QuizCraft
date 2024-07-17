<script lang="ts">  
  import { register, getNickName, logout } from '$lib/firebase/fitebase';
	import { onMount } from 'svelte';
	import { navigate } from 'svelte-routing';
  let email: string = '';
  let nickName: string = '';
  let password: string = '';

  onMount(async () => {
    if(localStorage.getItem("log") && (await getNickName(localStorage.getItem("log"))) !== null){
      navigate("/main")
      location.reload();
    }
  })

  async function handleSubmit() {
    let result = await register(email, nickName, password);
    
    if(!result.passed)
      alert(result.errorMsg);
    else{
      alert("Registretion competed!");
      navigate("/login")
      location.reload();
    }
  }
</script>


<div class="container">
  <h1>Register</h1>
  <form on:submit|preventDefault="{handleSubmit}">
    <label>
      Email:
      <input type="email" bind:value="{email}" />
    </label>
    <label>
      NickName:
      <input type="text" bind:value="{nickName}" />
    </label>
    <label>
      Password:
      <input type="password" bind:value="{password}" />
    </label>
    <button type="submit">Register</button>
  </form>
  <p>Already have an account? <a href="/login">Log in</a></p>
</div>

<svelte:head>
  <title>registration</title>
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
