<script lang="ts">
	import State from "./State.svelte"
	import { activeState, nodeStore } from "../stores/nodeStore"
	import { currentConnection } from "../stores/connectionStore"
	import { mousePosition, originPosition, relativeMousePosition } from "../stores/positions"
	import Moovable from "../utils/Moovable.svelte"
	import ImageButton from "../utils/imageButton.svelte"
	import { onDestroy, onMount } from "svelte"

	let contener: HTMLElement | null = null
	let moovableElement: Moovable | null = null
	let active = false
	let fileOver = false

	const jsonInput = document.createElement("input")
	jsonInput.type = "file"
	jsonInput.accept = "application/json"

	function parseJSONFile(file : File) {
		if (!file) return
		if (file.type !== "application/json") {
			alert("File is not a JSON file")
			return
		}
		const reader = new FileReader()
		reader.onload = (e) => {
			try {
				const json = JSON.parse(e.target.result as string)
				nodeStore.fromJSON(json)
			} catch (e) {
				console.error(e)
				alert("Error parsing JSON file")
			}
		}
		reader.onerror = (e) => {
			console.error(e)
			alert("Error parsing JSON file")
		}

		reader.readAsText(file)
	}

	function change(e : InputEvent) {
		const file = (e.target as HTMLInputElement).files![0]
		parseJSONFile(file)
	}
	
	onMount(() => {
		jsonInput.addEventListener("change", change)
	})

	onDestroy(() => {
		jsonInput.removeEventListener("change", change)
	})

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
			inputConnections: []
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

	function toJSON() {
		const json = nodeStore.toJSON()
		const jsonFile = new Blob([JSON.stringify(json)], { type: "application/json" })
		const jsonURL = URL.createObjectURL(jsonFile)
		const link = document.createElement("a")
		link.href = jsonURL
		link.download = "automaton.json"
		link.click()
	}

	function fromJSON() {
		jsonInput.click()
	}

	function fileDrop(e : DragEvent) {
		fileOver = false
		const file = e.dataTransfer.files[0]
		parseJSONFile(file)
		return
	}

	function dragenter(e : DragEvent) {
		if (e.dataTransfer.types.includes("Files"))
			fileOver = true
	}

	function dragleave(e : DragEvent) {
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
	on:dragover|preventDefault={_ => fileOver = true}
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
	bind:this={contener}
	class:active
>
	<nav class="editor__navbar">
		<ImageButton
			src="/add.svg"
			label="Add State"
			on:click={createNewState}
			/>
		<ImageButton
			src="/export.svg"
			label="Save"
			on:click={toJSON}
			/>
		<ImageButton
			src="/open.svg"
			label="Load"
			on:click={fromJSON}
			/>
	</nav>
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
		background-color: rgba(0, 0, 0, .5);
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

		&__navbar {
			position: absolute;
			top: 0;
			bottom: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			left: 0;
			width: min-content;
			padding: 1em;
			gap: .5em;
			z-index: 500;
		}
	}
</style>
