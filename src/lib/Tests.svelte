<script lang="ts">
	import TagInput from "../utils/TagInput.svelte"
	import { testStore } from "../stores/tests"
	import { tick } from "svelte"

	export let display: boolean
	let contener: HTMLElement

	function createTest() {
		testStore.update(tests => {
			tests.push({
				input: [],
				expectedState: "",
			})
			return tests
		})
		tick().then(() => {
			contener.scrollTop = contener.scrollHeight
		})
	}

	function deleteTest(i: number) {
		return () => {
			testStore.update(tests => {
				tests.splice(i, 1)
				return tests
			})
		}
	}
</script>

<nav
	class="test"
	class:display
	bind:this={contener}
>
	<h2>Tests cases</h2>
	{#each $testStore as test, i}
		<div>
			<label for="testInput-{i}">
				Input for test {i}
			</label>
			<TagInput
				bind:tags={test.input}
				id="testInput-{i}"
			/>
			<label for="test-{i}">Expected state</label>
			<input
				id="test-{i}"
				type="text"
				bind:value={test.expectedState}
			/>
			<button on:click={deleteTest(i)}>
				Remove test {i}
			</button>
		</div>
		<hr />
	{/each}
	<button on:click={createTest}> Create a new test </button>
</nav>

<style lang="scss">
	.test {
		h2 {
			position: sticky;
			top: -10px;
			background-color: var(--bacground-gray);
			z-index: 20;
			margin-top: -25px;
			margin-left: -10px;
			margin-right: -10px;
			padding: 10px;
		}
		input {
			background-color: white;
			border: 1px solid var(--primary-color);
			border-radius: 5px;
			padding: 5px;
			width: 100%;
			box-sizing: border-box;
		}
		button {
			margin-top: 5px;
			width: 100%;
			box-sizing: border-box;
		}
		&.display {
			display: block;
		}
		display: none;
		background-color: var(--bacground-gray);
		border: 1px solid var(--primary-color);
		position: absolute;
		right: 10px;
		margin-top: auto;
		margin-bottom: auto;
		border-radius: 5px;
		padding: 10px;
		max-width: 400px;

		top: 50%;
		transform: translateY(-50%);
		max-height: 50vh;
		overflow-y: scroll;
		z-index: 99999;
	}
</style>
