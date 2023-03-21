<script lang="ts">
	import ImageButton from "../utils/imageButton.svelte"
	import { onDestroy, onMount } from "svelte"
	import { nodeStore } from "../stores/nodeStore"
	import { originPosition } from "../stores/positions"
	import { parseJSONFile } from "../utils/parseJSON"

	const jsonInput = document.createElement("input")
	jsonInput.type = "file"
	jsonInput.accept = "application/json"

	function sendDownloadFile(
		filename: string,
		mimeType: string,
		text: string
	) {
		const file = new Blob([text], { type: mimeType })
		const url = URL.createObjectURL(file)
		const a = document.createElement("a")
		a.setAttribute("href", url)
		a.setAttribute("download", filename)
		a.click()
	}

	function change(e: InputEvent) {
		const file = (e.target as HTMLInputElement).files![0]
		parseJSONFile(file, nodeStore.fromJSON)
	}

	onMount(() => {
		jsonInput.addEventListener("change", change)
	})

	onDestroy(() => {
		jsonInput.removeEventListener("change", change)
	})

	function createNewState() {
		const node = {
			name: "New_State " + $nodeStore.length,
			entryNode: $nodeStore.length === 0,
			events: [],
			position: {
				x: window.innerWidth / 2 - $originPosition.x,
				y: window.innerHeight / 2 - $originPosition.y,
			},
			inputConnections: [],
		}
		node.position.x -= nodeStore.computeTheoreticalWidth(node) / 2
		node.position.y -= nodeStore.computeTheoreticalHeight(node) / 2
		nodeStore.createState(node)
	}

	function toJSON() {
		const json = nodeStore.toJSON()
		sendDownloadFile(
			"automaton.json",
			"application/json",
			JSON.stringify(json)
		)
	}

	function fromJSON() {
		jsonInput.click()
	}

	function build() {
		const automaton = nodeStore.toAutomaton()
		if (automaton === null) {
			return
		}
		sendDownloadFile("automaton", "text/plain", automaton)
	}
</script>

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
	<ImageButton
		src="/build.svg"
		label="Build"
		on:click={build}
	/>
</nav>

<style lang="scss">
	.editor__navbar {
		position: absolute;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		left: 0;
		width: min-content;
		padding: 1em;
		gap: 0.5em;
		z-index: 500;
	}
</style>
