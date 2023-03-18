<script lang="ts">
	import { currentConnection } from "../stores/connectionStore"
	import { relativeMousePosition } from "../stores/positions"
	import { Connection } from "./connection"
	import ConnectorLine from "./ConnectorLine.svelte"
	import { transparentImage } from "../utils/transparentImage"
	import type { node } from "../utils/types"

	type positionType = "left" | "right"
	let display: HTMLElement | null = null

	export let eventName: string
	export let parentNode: node
	export let connection: [string, Connection] = null
	export let position: positionType
	export let self = null
	let inputConnections: Connection[] = []

	export function addConnection(connection: Connection) {
		parentNode.events.map((c) => {
			if (c[0] === eventName) {
				c[1] = connection
			}
			return c
		})
	}

	export function removeInputConnection(connection: Connection) {
		inputConnections = inputConnections.filter(c => c !== connection)
	}

	export function getPos() {
		if (display === null) return
		const rect = display.getBoundingClientRect()
		return {
			x: rect.x + rect.width / 2,
			y: rect.y + rect.height / 2,
		}
	}

	$: {
		parentNode.position
		update()
	}

	export function update() {
		const pos = getPos()
		if (!pos) return
		if (position === "right") {
			if (connection === null) return
			connection[1].update(pos, true)
		} else {
			inputConnections.forEach((c) => {
				c.update(pos, false)
			})
		}
	}

	function initConnection(e : DragEvent) {
		e.dataTransfer.setDragImage(transparentImage, 0, 0)
		const pos = getPos()
		if (position === "left") {
			if (inputConnections.length == 0) {
				$currentConnection = new Connection(null, parentNode)
				console.log("Init left connection", pos)
			} else {
				$currentConnection = inputConnections[inputConnections.length - 1]
				$currentConnection.setEndNode(null, self)
				console.log("Break a right connection", pos)
			}
			return false
		} else {
			$currentConnection = connection[1]
			$currentConnection.setStartNode(parentNode)
			console.log("Init right connection", pos)
		}
		$currentConnection.display = true

		$currentConnection.update(
			{
				x: pos.x,
				y: pos.y,
			},
			position === "right"
		)
		$currentConnection.update(
			{
				x: pos.x,
				y: pos.y,
			},
			position === "left"
		)
		return false
	}

	function newEndPos(e : DragEvent) {
		if ($currentConnection === null) return
		$currentConnection.update($relativeMousePosition, position === "left")
	}

	function newConnection() {
		if ($currentConnection === null) return
		if ($currentConnection.getStartNode() !== null && position === "left") {
			console.log("Connection successfully created right to left")
			$currentConnection.setEndNode(parentNode, self)
			inputConnections.push($currentConnection)
		} else if (
			$currentConnection.getEndNode() !== null &&
			position === "right"
		) {
			console.log("Connection successfully created left to right")
			$currentConnection.setStartNode(parentNode)
		} else {
			console.log("Connection cancelled")
			$currentConnection.display = false
		}
		$currentConnection = null
	}

	function cancelConnection () {
		if ($currentConnection === null) return
		console.log("Connection cancelled")
		$currentConnection.display = false
		$currentConnection = null
	}
</script>

<div
	class={position}
	bind:this={display}
	draggable="true"
	on:dragend|preventDefault={cancelConnection}
	on:drag={newEndPos}
	on:dragstart={initConnection}
	on:dragover|preventDefault
	on:drop={newConnection}
>
	{#if position === "right"}
		<ConnectorLine bind:connection={connection[1]} />
	{/if}
</div>

<style lang="scss">
	div {
		position: absolute;
		border-radius: 50%;
		background: #fff;
		border: solid 1px #787878;
		box-sizing: border-box;
		width: calc(var(--connector-radius) * 2);
		height: calc(var(--connector-radius) * 2);
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
		top: calc(50% - var(--connector-radius));

		&:hover {
			background-color: #3d3d3d;
		}

		&.left {
			left: calc(-1 * var(--connector-radius));
		}

		&.right {
			right: calc(-2.5 * var(--connector-radius));
		}
	}
</style>
