<script>
  import { signInWithRedirect, signOut } from "firebase/auth";
  import { authState } from "rxfire/auth";
  import { onDestroy } from "svelte";
  import { auth, googleProvider } from "./firebase";
  import Profile from "./Profile.svelte";
  import Todos from "./Todos.svelte";

  let user;

  const unsubscribe = authState(auth).subscribe((u) => (user = u));

  function login() {
    signInWithRedirect(auth, googleProvider);
  }

  function logout() {
    signOut(auth);
  }

  onDestroy(() => {
    unsubscribe();
  });
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
