<script lang="ts">
 import Button, { Label } from '@smui/button';
</script>

<main>
 <h2>about <span class="purple">Quiz</span><span class="lime">Craft</span></h2>
 <p>On our website you can <span class="lime">create your own quizzes</span>, share them and <span class="purple">take others</span>. Enjoy!</p>
 <div class="buttons">
  <Button
   class="my-colored-button"
   variant="unelevated"
   href="/login"
  >
   <Label>Log in</Label>
  </Button>
  or
  <Button
   class="my-colored-button-reg"
   variant="unelevated"
   href="/register"
  >
   <Label>Register</Label>
  </Button>
 </div>
</main>

<style>
 @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

 main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(26,26,26,1) 100%);
  color: white;
  font-family: 'Roboto', sans-serif;
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

 .buttons {
  display: flex;
  align-items: center;
  justify-content: center;
 }

 :global(.my-colored-button) {
  margin-right: 20px;
  background-color: green;
  color: white;
 }

 :global(.my-colored-button-reg) {
  margin-left: 20px;
  background-color: green;
  color: white;
 }
</style>
