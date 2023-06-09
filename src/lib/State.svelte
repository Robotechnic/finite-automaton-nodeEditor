<script lang="ts">
	import trash from "../assets/trash.svg"
	import { activeState, nodeStore } from "../stores/nodeStore"
	import type { node } from "../utils/types"
	import Moovable from "../utils/Moovable.svelte"
	import Connector from "../connections/Connector.svelte"
	import { Connection } from "../connections/connection"
	import { currentConnection } from "../stores/connectionStore"
	import ConnectorLine from "../connections/ConnectorLine.svelte"

	let moovableElement: Moovable | null = null
	export let value: node

	function inputValidator(value: string): [boolean, string] {
		if (value.length === 0) {
			return [false, ""]
		}
		if (value.includes(" ")) {
			return [false, value.replace(" ", "_")]
		}
		if (value.length > 20) {
			return [false, value.slice(0, 20)]
		}
		return [true, value]
	}

	let entryNodeGroup = ""
	$: {
		value.entryNode = entryNodeGroup === "entryNoode-" + value.name
	}

	$: {
		const [isValid, newValue] = inputValidator(value.name)
		if (!isValid && newValue.length > 0) {
			value.name = newValue
		}
	}

	$: {
		value.events.forEach(event => {
			const [isValid, newValue] = inputValidator(event[0])
			if (!isValid && newValue.length > 0) {
				event[0] = newValue
			}
		})
	}

	function mouseDown(e: MouseEvent) {
		activeState.set({
			isActive: moovableElement.isActive,
			newMousePos: moovableElement.newMousePos,
		})
		moovableElement.mouseDown(e)
	}

	function mouseUp() {
		moovableElement.mouseUp()
		if ($currentConnection) {
			$currentConnection.display = false
			$currentConnection = null
		}
	}

	function createNewEvent() {
		value.events = [
			...value.events,
			[String(value.events.length), new Connection(null, null)],
		]
	}

	function deleteEvent(i: number) {
		value.events[i][1].setEndNode(null)
		// delete the i-th event wihout breaking references of the i+n-th events
		value.events = value.events
			.slice(0, i)
			.concat(value.events.slice(i + 1))
	}

	function deleteNode() {
		const continueDeletion = confirm(
			"Are you sure you want to delete this node?"
		)
		if (continueDeletion) {
			nodeStore.deleteState(value)
		}
	}
</script>

<Moovable
	bind:this={moovableElement}
	bind:position={value.position}
>
	<div
		on:mousedown|self={mouseDown}
		on:mouseup|self={mouseUp}
		class="node"
		id="node-{value.name}"
	>
		<Connector
			position="left"
			eventName="input"
			parentNode={value}
		/>
		<h2>
			{#if value.name.length === 0}
				<span class="invalid">Invalid name</span>
			{:else}
				{value.name}
			{/if}
		</h2>
		<button
			class="node__delete"
			on:click={deleteNode}
		>
			Delete this node
		</button>
		<div class="node_entryNode">
			<label for="entryNode">Entry node:</label>
			<input
				type="radio"
				name="entryNode"
				bind:group={entryNodeGroup}
				value="entryNoode-{value.name}"
			/>
		</div>
		<div class="node__name">
			<label for="name">Name:</label>
			<input
				bind:value={value.name}
				class:invalid={value.name.length === 0}
				type="text"
				name="name"
				id="name"
			/>
		</div>
		<div class="node__outputs">
			<label for="outputs">Outputs events:</label>
			<button on:click={createNewEvent}> Add </button>
			{#each value.events as output, i}
				<div class="node__outputs__events">
					<input
						bind:value={output[0]}
						class:invalid={value.events.length === 0}
						type="text"
						name="outputs"
						id="outputs"
					/>
					<button on:click={() => deleteEvent(i)}>
						<img
							src={trash}
							alt="trash"
						/>
					</button>
				</div>
			{/each}
		</div>
		<div class="node__outputsConnectors">
			{#each value.events as output, i}
				<div
					class="node__outputsConnectors__connector"
					id="connector-{value.name + output[0] + i}"
				>
					<span>{output[0]}</span>
					<Connector
						position="right"
						bind:eventName={output[0]}
						bind:connection={output}
						bind:parentNode={value}
					/>
				</div>
			{/each}
		</div>
	</div>
</Moovable>
<svg>
	{#each value.events as event}
		<ConnectorLine connection={event[1]} />
	{/each}
</svg>

<style lang="scss">
	@mixin disableUserInteraction {
		pointer-events: none;
		user-select: none;
	}

	input.invalid {
		border: 1px solid red;
	}

	svg {
		position: absolute;
		width: 0;
		height: 0;
		top: -80px;
		z-index: -1;
		overflow: visible !important;
	}

	.node {
		--connector-radius: 10px;

		cursor: pointer;

		button {
			cursor: pointer;
		}

		h2 {
			margin: 0;
			text-align: center;
			grid-area: header;
			@include disableUserInteraction;

			.invalid {
				color: red;
			}
		}

		label {
			@include disableUserInteraction;
		}

		&__delete {
			grid-area: delete;
			color: red;
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

			&__connector {
				position: relative;
				font-size: 100%;
			}
		}
		padding: 10px calc(var(--connector-radius) * 1.5);
		color: #fff;
		border: solid 1px #ccc;
		background: #9f9f9fe6;
		border-radius: 10px;
		width: min-content;
		height: min-content;

		display: grid;
		grid-template:
			"header     outputs"
			"delete     outputs"
			"entryNode  outputs"
			"name       outputs"
			"outputsDef outputs";
	}
</style>
