<script>
  export let id; // document ID
  export let text;
  export let complete;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch("remove", { id });
  }

  function toggleStatus() {
    let newStatus = !complete;
    dispatch("toggle", { id, newStatus });
  }
</script>

<div class="row bg-primary p-05 pl-1 pr-1 mb-005">
  {#if complete}
    <p class="is-complete">{text}</p>
  {:else}
    <p>{text}</p>
  {/if}

  <div>
    {#if complete}
      <button on:click={toggleStatus}>Not done</button>
    {:else}
      <button on:click={toggleStatus}>Done</button>
    {/if}
    <button class="ml-05" on:click={remove}>Remove</button>
  </div>
</div>

<style>
  .is-complete {
    text-decoration: line-through;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
