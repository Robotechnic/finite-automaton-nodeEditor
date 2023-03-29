<script lang="ts">
	import NavBar from "./NavBar.svelte"
	import State from "./State.svelte"
	import { activeState, nodeStore } from "../stores/nodeStore"
	import { currentConnection } from "../stores/connectionStore"
	import {
		mousePosition,
		originPosition,
		relativeMousePosition,
	} from "../stores/positions"
	import Moovable from "../utils/Moovable.svelte"
	import { parseJSONFile } from "../utils/parseJSON"
	import Tests from "./Tests.svelte"

	let moovableElement: Moovable | null = null
	let active = false
	let fileOver = false

	function mouseUpdate(e: MouseEvent) {
		$mousePosition = {
			x: e.clientX,
			y: e.clientY,
		}
		$relativeMousePosition = {
			x: e.clientX - $originPosition.x,
			y: e.clientY - $originPosition.y,
		}
	}

	function mouseMove(e: MouseEvent) {
		if ($activeState != null && $activeState.isActive()) {
			$activeState.newMousePos(e.clientX, e.clientY)
			return
		}
		if (moovableElement.isActive()) {
			moovableElement.newMousePos(e.clientX, e.clientY)
			return
		}

		if ($currentConnection !== null) {
			$currentConnection.mousePos(
				{
					x: e.clientX - $originPosition.x,
					y: e.clientY - $originPosition.y,
				},
				$currentConnection.display
			)
		}
	}

	function mouseDown(e: MouseEvent) {
		active = true
		moovableElement.mouseDown(e)
	}

	function mouseUp() {
		active = false
		moovableElement.mouseUp()
		if ($currentConnection !== null) {
			console.log("connection cancelled")
			$currentConnection = null
		}
	}

	function fileDrop(e: DragEvent) {
		fileOver = false
		const file = e.dataTransfer.files[0]
		parseJSONFile(file, nodeStore.fromJSON)
		return
	}

	function dragenter(e: DragEvent) {
		if (e.dataTransfer.types.includes("Files")) fileOver = true
	}

	function dragleave() {
		fileOver = false
	}
</script>

<svelte:window
	on:mousemove={mouseUpdate}
	on:dragenter={dragenter}
	on:dragleave={dragleave}
	on:dragover={mouseUpdate}
/>
<section
	class="fileDragOverlay"
	class:active={fileOver}
	on:drop|preventDefault|stopPropagation={fileDrop}
	on:dragover|preventDefault={_ => (fileOver = true)}
>
	<div class="fileDragOverlay__content">
		<h1>Drop your file here to open it</h1>
	</div>
</section>
<section
	class="editor"
	on:mousemove={mouseMove}
	on:mousedown|self={mouseDown}
	on:mouseup|self={mouseUp}
	class:active
>
	<NavBar />
	<Tests display={true} />
	<Moovable
		bind:this={moovableElement}
		bind:position={$originPosition}
	>
		{#each $nodeStore as value}
			<State bind:value />
		{/each}
	</Moovable>
</section>

<style lang="scss">
	.fileDragOverlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		display: none;

		&.active {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&__content {
			background-color: white;
			padding: 1em;
			border-radius: 1em;
		}
	}

	.editor {
		position: relative;
		width: 100%;
		flex-grow: 1;
		overflow: hidden;

		&.active {
			cursor: grabbing;
		}
	}
</style>
