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

<div class="row p-05 mb-005">
  <div class="flex" style="align-items: center;">
    {#if complete}
      <input type="checkbox" on:change={toggleStatus} class="mr-05" checked />
      <p class="is-complete">{text}</p>
    {:else}
      <input type="checkbox" on:change={toggleStatus} class="mr-05" />
      <p>{text}</p>
    {/if}
  </div>

  <div class="flex">
    {#if complete}
      <div class="badge clickable done" on:click={toggleStatus}>DONE</div>
    {:else}
      <div class="badge clickable inactive" on:click={toggleStatus}>TO DO</div>
    {/if}

    <div class="badge clickable danger ml-05" on:click={remove}>❌</div>
  </div>
</div>

<style>
  p {
    font-weight: 500;
  }
  .is-complete {
    text-decoration: line-through;
    font-weight: 350;
    color: rgb(165, 165, 165);
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.3rem;
  }
  .row:hover {
    background-color: rgb(245, 245, 245);
  }
  .badge {
    background-color: lightgray;
    color: rgb(78, 76, 76);
    padding: 0.15rem 0.3rem;
    border-radius: 0.2rem;
    font-size: 0.8rem;
    font-weight: 600;
  }
  .clickable {
    cursor: pointer;
  }
  .inactive {
    border: 0.01rem solid rgb(201, 201, 201);
    background-color: rgb(240, 240, 240);
    color: rgb(124, 124, 124);
  }
  .done {
    border: 0.01rem solid rgb(179, 236, 179);
    background-color: rgb(229, 248, 230);
    color: rgb(84, 129, 90);
  }
  .danger {
    border: 0.01rem solid rgb(255, 184, 184);
    background-color: rgb(255, 230, 230);
    color: rgb(97, 97, 97);
  }
</style>
