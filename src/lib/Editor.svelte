<script lang="ts">
	import State from "./State.svelte"
    import { activeState, nodeStore } from "./nodeStore"
    import Moovable from "./Moovable.svelte";

	let contener : HTMLElement | null = null
	let moovableElement : Moovable | null = null

	function createNewState() {
		const panPos = moovableElement!.getPosition()
		nodeStore.createState({
			name: "New State " + $nodeStore.length,
			events: [],
			position: {
				x: contener!.clientWidth / 2 - panPos.x,
				y: contener!.clientHeight / 2 - panPos.y
			}
		})
	}

	function mouseMove(e) {
		if ($activeState != null && $activeState.isActive()) {
			$activeState.newMousePos(e.clientX, e.clientY)
		} else if (moovableElement.isActive()) {
			moovableElement.newMousePos(e.clientX, e.clientY)
		}
	}
</script>

<section
	on:mousemove={mouseMove}
	on:mousedown|self={moovableElement.mouseDown}
	on:mouseup|self={moovableElement.mouseUp}
	bind:this={contener}
	class:active={moovableElement?.isActive()}
>
	<button on:click={createNewState}>
		New State
	</button>
	<Moovable 
		bind:this={moovableElement}
	>
		{#each $nodeStore as value}
			<State bind:value={value}/>
		{/each}
	</Moovable>
</section>

<style lang="scss">
	section {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		&.active {
			cursor: grabbing;
		}
	}
</style>