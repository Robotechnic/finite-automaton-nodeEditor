<script lang="ts">
	import type { Connection } from "./connection"

	export let connection: Connection
	export let color: string = "black"
	export let lineCap: "round" | "inherit" | "butt" | "square" = "round"
	export let lineStroke: number = 2
	let path = connection?.getSvgPath()
	let display = connection?.getDisplay()

	$: {
		path = connection?.getSvgPath()
		display = connection?.getDisplay()
	}
</script>

{#if $display}
	<path
		d={$path}
		stroke={color}
		stroke-linecap={lineCap}
		stroke-width={lineStroke}
		fill="none"
	/>
{/if}
