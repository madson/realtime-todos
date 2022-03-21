<script>
  import {
    onAuthStateChanged,
    signInWithRedirect,
    signOut,
  } from "firebase/auth";
  import { auth, googleProvider } from "./firebase";
  import Profile from "./Profile.svelte";
  import Todos from "./Todos.svelte";

  let user;

  onAuthStateChanged(auth, (loggedUser) => {
    user = loggedUser;
  });

  function login() {
    signInWithRedirect(auth, googleProvider);
  }

  function logout() {
    signOut(auth);
  }
</script>

{#if user}
  <Profile
    displayName={user.displayName}
    photoURL={user.photoURL}
    on:logout={logout}
  />
  <hr />
  <Todos uid={user.uid} />
{:else}
  <button on:click={login}>Sign with Google</button>
{/if}
