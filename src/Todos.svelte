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
  import { v4 as uuidv4 } from "uuid";
  import { db } from "./firebase";
  import TodoItem from "./TodoItem.svelte";

  // User ID passed from parent
  export let uid;

  // Form text
  let text = "";

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
    try {
      await updateDoc(docRef, {
        complete: newStatus,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function removeItem(event) {
    const { id } = event.detail;
    const docRef = doc(todosRef, id);
    try {
      await deleteDoc(docRef);
    } catch (e) {
      console.log(e);
    }
  }

  function keypressed(event) {
    if (event.keyCode != 13) {
      return;
    }
    event.preventDefault();
    add();
  }
</script>

<input
  placeholder="Add a checklist item"
  bind:value={text}
  on:keypress={keypressed}
/>

<hr />

<div>
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
  input {
    width: 100%;
    padding: 0.5rem 0.7rem;
    font-weight: 300;
    border-width: 0.01rem;
    background-color: rgb(246, 250, 253);
  }
</style>
