<script lang="ts">
	import type { Connection } from "./connection"

	export let connection: Connection
	export let color: string = "black"
	export let lineCap: "round" | "inherit" | "butt" | "square" = "round"
	export let lineStroke: number = 2
	let svgBoundingBox = connection?.getSvgBounds()
	let path = connection?.getSvgPath()
	let display = connection?.getDisplay()
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={$svgBoundingBox?.width ?? 0}
	height={$svgBoundingBox?.height ?? 0}
	style="--x: {$svgBoundingBox?.x ?? 0}px; --y: {$svgBoundingBox?.y ?? 0}px;"
>
	{#if $display}
		<path
			d={$path}
			stroke={color}
			stroke-linecap={lineCap}
			stroke-width={lineStroke}
			fill="none"
		/>
	{/if}
</svg>

<style lang="scss">
	svg {
		position: absolute;
		pointer-events: none;
		top: var(--y);
		left: var(--x);
		z-index: 99;
		border: dashed 1px red;
	}
</style>
