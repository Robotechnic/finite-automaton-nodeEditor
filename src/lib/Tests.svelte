<script lang="ts">
	import TagInput from "../utils/TagInput.svelte"

	export let display: boolean
</script>


<nav class="test" class:display>
	<h2>
		Tests cases
	</h2>
	<div>
		<TagInput 
			placeholder="tags"
			tags={["test1", "test2"]}
			/>
	</div>
</nav>

<style lang="scss">
	.test {
		h2 {
			position: sticky;
			top:0;
			background-color: var(--bacground-gray);
			z-index: 20;
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
	}
</style>