<script lang="ts">
	import type { point } from "./types"
	export let pos : point = {x : 0, y : 0}
	export let mouseDelta : point = {x : 0, y : 0}
	export let active = false

	export function mouseDown(e) {
		mouseDelta = {
			x: e.clientX - pos.x,
			y: e.clientY - pos.y
		}
		active = true
	}

	export function getPosition() {
		return pos
	}

	export function isActive() {
		return active
	}

	export function newMousePos(x : number, y : number) {
		pos = {
			x: x - mouseDelta.x,
			y: y - mouseDelta.y
		}
	}

	export function mouseUp(e) {
		active = false
	}
</script>


<div
	class:active={active}
	style="--pos-x: {pos.x}px; --pos-y: {pos.y}px;"
>
<slot />
</div>

<style lang="scss">
.active {
	cursor: grabbing;
}

div {
	position: absolute;
	top: var(--pos-y);
	left: var(--pos-x);
}
</style>