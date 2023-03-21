<script lang="ts">
	import { currentConnection } from "../stores/connectionStore"
	import { originPosition, relativeMousePosition } from "../stores/positions"
	import { Connection } from "./connection"
	import { transparentImage } from "../utils/transparentImage"
	import type { node } from "../utils/types"

	type positionType = "left" | "right"
	let display: HTMLElement | null = null

	export let eventName: string
	export let parentNode: node
	export let connection: [string, Connection] = null
	export let position: positionType
	let active = false

	export function addConnection(connection: Connection) {
		parentNode.events.map((c) => {
			if (c[0] === eventName) {
				c[1] = connection
			}
			return c
		})
	}

	export function removeInputConnection(connection: Connection) {
		parentNode.inputConnections = parentNode.inputConnections.filter(c => c !== connection)
	}

	export function getPos() {
		if (display === null) return
		const rect = display.getBoundingClientRect()
		return {
			x: rect.x + rect.width / 2 - $originPosition.x,
			y: rect.y + rect.height / 2 - $originPosition.y,
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
			if (connection === null || connection[1] === null) return
			connection[1].update(pos, false)
		} else {
			parentNode.inputConnections.forEach((c) => {
				c.update(pos, true)
			})
		}
	}

	function initConnection(e : DragEvent) {
		e.dataTransfer.setDragImage(transparentImage, 0, 0)
		const pos = getPos()
		if (position === "left") {
			if (parentNode.inputConnections.length == 0) {
				$currentConnection = new Connection(null, parentNode)
				console.log("Init left connection", pos)
			} else {
				$currentConnection = parentNode.inputConnections[parentNode.inputConnections.length - 1]
				$currentConnection.setEndNode(null)
				console.log("Break a right connection", pos)
			}
			return false
		} else {
			$currentConnection = connection[1]
			$currentConnection.setStartNode(parentNode)
			$currentConnection.setEndNode(null)
			console.log("Init right connection", pos)
		}
		$currentConnection.display = true

		$currentConnection.update(
			{
				x: pos.x,
				y: pos.y,
			},
			true
		)
		$currentConnection.update(
			{
				x: pos.x,
				y: pos.y,
			},
			false
		)
		return false
	}

	function newEndPos() {
		if ($currentConnection === null) return
		$currentConnection.mousePos($relativeMousePosition)
	}

	function newConnection() {
		if ($currentConnection === null) return
		if ($currentConnection.getStartNode() !== null && position === "left") {
			console.log("Connection successfully created right to left")
			$currentConnection.setEndNode(parentNode)
			$currentConnection.update(getPos(), true)
			parentNode.inputConnections.push($currentConnection)
		} else if (
			$currentConnection.getEndNode() !== null &&
			position === "right"
		) {
			console.log("Connection successfully created left to right")
			$currentConnection.setStartNode(parentNode)
			$currentConnection.update(getPos(), false)
		} else {
			console.log("Connection cancelled")
			$currentConnection.display = false
		}
		$currentConnection = null
		active = false
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
	class:active={active}
	bind:this={display}
	draggable="true"
	on:dragend|preventDefault={cancelConnection}
	on:drag={newEndPos}
	on:dragstart={initConnection}
	on:dragover|preventDefault={() => {active = true}}
	on:dragleave|preventDefault={() => {active = false}}
	on:dragenter|preventDefault={() => {active = true}}
	on:drop={newConnection}
>
&nbsp;
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

		&:hover, &.active {
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
