<script lang="ts">
	import trash from "../assets/trash.svg"
    import { activeState } from "./nodeStore"
    import type { node } from "./types"
    import Moovable from "./Moovable.svelte";
    import { onMount } from "svelte";

	let moovableElement : Moovable | null = null
	export let value : node = {
		name: "Event",
		events: [],
		position: {x: 0, y: 0},
	}

	onMount(()=>{
		moovableElement.newMousePos(
			value.position.x,
			value.position.y
		)
	})

	function mouseDown(e) {
		activeState.set({
			isActive : moovableElement.isActive,
			newMousePos : moovableElement.newMousePos
		})
		moovableElement.mouseDown(e)
	}

	// node settings
	function createNewEvent() {
		value.events = [...value.events, String(value.events.length)]
	}

	function deleteEvent(i : number) {
		value.events = value.events.filter((_, index) => index !== i)
	}
</script>

<Moovable bind:this={moovableElement}>
<div
	on:mousedown|self={mouseDown}
	on:mouseup|self={moovableElement.mouseUp}
	class="node" 
	id="node-{value.name}"
	>
	<h2>{value.name}</h2>
	<div class="node__name">
		<label for="name">Name:</label>
		<input
			bind:value = {value.name}
			class:invalid = {value.name.length === 0}
			type="text" 
			name="name" 
			id="name" 
			/>
	</div>
	<div class="node__outputs">
		<label for="outputs">Outputs events:</label>
		<button on:click={createNewEvent}>
			Add
		</button>
		{#each value.events as output, i}
			<div class="node__outputs__events">
				<input
					bind:value = {value.events[i]}
					class:invalid = {value.events.length === 0}
					type="text" 
					name="outputs"
					id="outputs" 
					/>
				<button on:click={() => deleteEvent(i)}>
					<img src={trash} alt="trash" />
				</button>
			</div>
		{/each}
	</div>
	<div class="node__outputsConnectors">
		{#each value.events as output, i}
			<div class="node__outputsConnectors__connector" id="connector-{name + output + i}">
				<span>{output}</span>
			</div>
		{/each}
	</div>
</div>
</Moovable>

<style lang="scss">
@mixin connector {
	content: " ";
	position: absolute;
	border-radius: 50%;
	background: #fff;
	border: solid 1px #787878;
	box-sizing: border-box;
	width: calc(var(--connector-radius) * 2);
	height: calc(var(--connector-radius) * 2);
	cursor: pointer;
	transition: color ease-in-out;

	&:hover {
		background-color: #3d3d3d;
	}
}

@mixin disableUserInteraction {
	pointer-events: none;
	user-select: none;
}

input.invalid {
	border: 1px solid red;
}
.node {
	--connector-radius: 10px;
	h2 {
		margin: 0;
		text-align: center;
		grid-area: header;
		@include disableUserInteraction;
	}

	label {
		@include disableUserInteraction;
	}

	&::before {
		// this represent the node input connector
		@include connector;
		top: calc(50% - var(--connector-radius));
		left: calc(-1 * var(--connector-radius));
	}

	&__outputs {
		grid-area: outputsDef;
		display: flex;
		flex-direction: column;
		gap: 5px;

		&__events {
			display: flex;
			gap: 5px;
			align-items: center;
			justify-content: center;

			button {
				display: flex;
				justify-content: center;
				background: none;
				border: none;
				cursor: pointer;
				&:hover {
					filter: brightness(10);
				}

				img {
					width: 1.5em;
					height: 1.5em;
				}
			}
		}
	}

	&__outputsConnectors {
		grid-area: outputs;
		display: flex;
		flex-direction: column;
		gap: 5px;
		justify-content: space-around;
		align-items: flex-end;

		span {
			@include disableUserInteraction;
		}

		&__connector{
			position: relative;
			line-height: calc(2 * var(--connector-radius));
			font-size: 100%;
			&::after {
				@include connector;
				top: calc(50% - var(--connector-radius));
				right: calc(-2.5 * var(--connector-radius));
			}
		}
	}
	padding: 10px calc(var(--connector-radius) * 1.5);
	color: #fff;
	border: solid 1px #ccc;
	background: #9c9c9c;
	border-radius: 10px;
	width: min-content;
	height: min-content;

	display: grid;
	grid-template: 
		"header outputs"
		"name outputs"
		"outputsDef outputs"
}
</style>