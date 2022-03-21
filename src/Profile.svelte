<script>
  import { createEventDispatcher } from "svelte";

  export let displayName;
  export let photoURL;

  const dispatch = createEventDispatcher();

  function logout(event) {
    console.log(event);
    dispatch("logout");
  }
</script>

<div class="rounded p-1 bg-primary">
  <img src={photoURL} width="100" alt="user avatar" />
  <h4>{displayName}</h4>
  <button on:click={logout}>Logout</button>
</div>

<style>
  img {
    margin: auto;
    border-radius: 50%;
  }
  h4 {
    margin: 0.3rem 0 0.5rem 0;
  }
  div {
    display: flex;
    text-align: center;
    flex-flow: column;
  }
</style>
