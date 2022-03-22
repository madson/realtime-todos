<script>
  import {
    collection,
    deleteDoc,
    doc,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
  } from "firebase/firestore";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";
  import { onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";
  import { db } from "./firebase";
  import TodoItem from "./TodoItem.svelte";

  // User ID passed from parent
  export let uid;

  // Form text
  let text = "";
  let ref;

  // Query requires an index, see screenshot below
  const todosRef = collection(db, "todos");
  const queryRef = query(todosRef, where("uid", "==", uid), orderBy("created"));

  const todos = collectionData(queryRef, { idField: "id" }).pipe(startWith([]));

  async function add() {
    const docRef = doc(todosRef, uuidv4());
    const data = { uid, text, complete: false, created: Date.now() };
    text = "";
    try {
      await setDoc(docRef, data);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateStatus(event) {
    const { id, newStatus } = event.detail;
    const docRef = doc(todosRef, id);
    await updateDoc(docRef, {
      complete: newStatus,
    });
  }

  async function removeItem(event) {
    const { id } = event.detail;
    const docRef = doc(todosRef, id);
    await deleteDoc(docRef);
  }

  function keypressed(event) {
    if (event.keyCode != 13) {
      return;
    }
    event.preventDefault();
    add();
  }

  onMount(() => {
    ref.focus();
  });
</script>

<div class="flex rounded bg-secondary p-1">
  <input
    class="flex-1"
    bind:value={text}
    on:keypress={keypressed}
    bind:this={ref}
  />
  <button on:click={add}>Add Task</button>
</div>

<hr />

<div class="rounded">
  {#each $todos as todo}
    <TodoItem
      id={todo.id}
      text={todo.text}
      complete={todo.complete}
      on:remove={removeItem}
      on:toggle={updateStatus}
    />
  {/each}
</div>

<style>
  button {
    margin-left: 0.5rem;
  }
</style>
