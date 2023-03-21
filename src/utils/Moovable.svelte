<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import type { point } from "./types"
	const dispatcher = createEventDispatcher()
	export let position: point = { x: 0, y: 0 }
	export let mouseDelta: point = { x: 0, y: 0 }
	export let active = false

	export function mouseDown(e) {
		mouseDelta = {
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		}
		active = true
	}

	export function getPosition() {
		return position
	}

	export function isActive() {
		return active
	}

	export function newMousePos(x: number, y: number) {
		position = {
			x: x - mouseDelta.x,
			y: y - mouseDelta.y,
		}
		dispatcher("move", position)
	}

	export function mouseUp(e) {
		active = false
	}
</script>

<div class:active style="--pos-x: {position.x}px; --pos-y: {position.y}px;">
	<slot />
</div>

<style lang="scss">
	div {
		position: absolute;
		top: var(--pos-y);
		left: var(--pos-x);

		&.active {
			cursor: grabbing;
			z-index: 100;

			* {
				pointer-events: none;
			}
		}
	}
</style>
