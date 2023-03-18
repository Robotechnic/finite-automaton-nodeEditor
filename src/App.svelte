<script lang="ts">
import Editor from "./lib/Editor.svelte"
</script>

<main>
  <header>
	<h1>Finite automaton editor</h1>
	<nav>
		<a href="https://github.com/Robotechnic/finite-automaton">About the language</a>
		<a href="http://github.com">Git Hub</a>
	</nav>
  </header>
  <Editor/>
</main>

<style lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--primary-background);
  border-bottom: 1px solid #ccc;
  h1 {
	margin: 0;
  }
  nav {
	display: flex;
	align-items: center;
	justify-content: center;
	a {
	  margin-left: 1rem;
	  color: var(--primary-color);
	  text-decoration: none;
	  margin-top: auto;
	  margin-bottom: auto;
	  &:hover {
		color: #000;
	  }
	}
  }
}
</style>