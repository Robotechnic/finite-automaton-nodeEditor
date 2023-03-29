<script lang="ts">
	import { createEventDispatcher } from "svelte"


	export let value: string
	export let placeholder: string = ""

	const closeEvent = createEventDispatcher()

	function close() {
		closeEvent("close")
	}
</script>

<div 
	class="tag"
	draggable="true"
	on:dragstart
	on:drag
	on:dragenter
	on:dragleave
	on:dragend
	on:dragover
>
	<span>
		{value}
		<input
			bind:value
			placeholder={placeholder}
			on:keydown
			on:keyup
			on:input
			on:blur
		/>
	</span>
	<button on:click={close}>
		X
	</button>
</div>

<style lang="scss">
	.tag {
		background-color: var(--primary-color);
		border-radius: 5px;
		padding: 2px;
		margin-right: 5px;
		position: relative;
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-bottom: 5px;

		span {
			color: transparent;
			height: min-content;
		}

		span, input {
			padding: 0 5px;
			box-sizing: border-box;
			font-size: 16px;
		}

		input {
			border: none;
			background-color: transparent;
			color: white;
			outline: none;
			position:absolute;
			border: none;
			left:0;
			right:0;
			top: 50%;
			transform: translateY(-50%);
			width:100%;
		}

		button {
			border: none;
			background-color: transparent;
			color: white;
			outline: none;
			cursor: pointer;
			z-index:10;
		}
	}
</style>