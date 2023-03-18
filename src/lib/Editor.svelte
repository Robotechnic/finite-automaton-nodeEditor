<script lang="ts">
	import State from "./State.svelte"
	import { activeState, nodeStore } from "../stores/nodeStore"
	import { currentConnection } from "../stores/connectionStore"
	import { mousePosition, originPosition, relativeMousePosition } from "../stores/positions"
	import Moovable from "../utils/Moovable.svelte"

	let contener: HTMLElement | null = null
	let moovableElement: Moovable | null = null
	let active = false

	function createNewState() {
		const panPos = moovableElement!.getPosition()
		nodeStore.createState({
			name: "New_State " + $nodeStore.length,
			entryNode: $nodeStore.length === 0,
			events: [],
			position: {
				x: contener!.clientWidth / 2 - panPos.x,
				y: contener!.clientHeight / 2 - panPos.y,
			},
		})
	}

	function mouseUpdate(e) {
		const panPos = moovableElement!.getPosition()
		$mousePosition = {
			x: e.clientX,
			y: e.clientY,
		}
		$relativeMousePosition = {
			x: e.clientX - panPos.x,
			y: e.clientY - panPos.y,
		}
	}

	function mouseMove(e) {
		if ($activeState != null && $activeState.isActive()) {
			$activeState.newMousePos(e.clientX, e.clientY)
			return
		}
		if (moovableElement.isActive()) {
			moovableElement.newMousePos(e.clientX, e.clientY)
			return
		}

		if ($currentConnection !== null) {
			const panPos = moovableElement!.getPosition()
			$currentConnection.mousePos(
				{
					x: e.clientX - panPos.x,
					y: e.clientY - panPos.y,
				},
				$currentConnection.display
			)
		}
	}

	function mouseDown(e) {
		active = true
		moovableElement.mouseDown(e)
	}

	function mouseUp(e) {
		active = false
		moovableElement.mouseUp(e)
		if ($currentConnection !== null) {
			console.log("connection cancelled")
			$currentConnection = null
		}
	}
</script>

<svelte:window
	on:mousemove={mouseUpdate}
	on:dragover={mouseUpdate}
/>
<section
	on:mousemove={mouseMove}
	on:mousedown|self={mouseDown}
	on:mouseup|self={mouseUp}
	bind:this={contener}
	class:active
>
	<button on:click={createNewState}> New State </button>
	<Moovable 
		bind:this={moovableElement}
		bind:pos={$originPosition}	
	>
		{#each $nodeStore as value}
			<State bind:value />
		{/each}
	</Moovable>
</section>

<style lang="scss">
	section {
		position: relative;
		width: 100%;
		flex-grow: 1;
		overflow: hidden;

		&.active {
			cursor: grabbing;
		}
	}
</style>
