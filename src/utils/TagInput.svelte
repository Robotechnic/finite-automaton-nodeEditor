<script lang="ts">
	import Tag from "./Tag.svelte"

	export let tags: string[]
	export let placeholder: string = ""
	export let id: string
	let currentTag: string = ""
	let inputElement: HTMLInputElement
	let tagsElement: HTMLDivElement
	let dragData: { i: number; tag: string } = null

	function getNode(i: number) {
		return tagsElement.children[i].children[0]
			.children[0] as HTMLInputElement
	}

	function focusNode(i: number, pos: number) {
		const node = getNode(i)
		setTimeout(() => {
			node.focus()
			node.setSelectionRange(pos, pos)
		}, 10)
	}

	function cancelSpace(i: number) {
		if (tags[i].length === 0) {
			tags = tags.filter((_, j) => j !== i)
			if (tags.length === 0) {
				inputElement.focus()
			} else {
				if (i > 0) focusNode(i - 1, tags[i - 1].length + 1)
				else focusNode(0, tags[0].length + 1)
			}
		}
		if (tags[i].length > 20) {
			tags[i] = tags[i].slice(0, 20)
		}
	}

	function tagsInputKeydown(i: number) {
		return (e: KeyboardEvent) => {
			if (e.key === " ") {
				e.stopPropagation()
				e.preventDefault()
				return
			}
			const target = e.currentTarget as HTMLInputElement
			if (e.key === "ArrowLeft") {
				if (target.selectionStart === 0 && i > 0) {
					focusNode(i - 1, tags[i - 1].length + 1)
				}
			}

			if (e.key === "ArrowRight") {
				const goRight = target.selectionStart === target.value.length
				if (i < tags.length - 1) {
					if (goRight) {
						focusNode(i + 1, 0)
					}
				} else if (goRight) {
					setTimeout(() => {
						inputElement.focus()
						inputElement.setSelectionRange(0, 0)
					}, 10)
				}
			}
		}
	}

	function mainInputKeypress(e: KeyboardEvent) {
		if ((e.key === " " || e.key === "Enter") && currentTag.length > 0) {
			tags = [...tags, currentTag]
			currentTag = ""
			e.stopPropagation()
			e.preventDefault()
		}
		if (
			(e.key === "Backspace" || e.key === "ArrowLeft") &&
			inputElement.selectionStart === 0 &&
			tags.length > 0
		) {
			const node = getNode(tags.length - 1)
			const curPos = tags[tags.length - 1].length + 1
			setTimeout(() => {
				node.focus()
				node.setSelectionRange(curPos, curPos)
			}, 10)
		}
	}

	function nodeDragStart(i: number) {
		dragData = { i, tag: tags[i] }
	}

	function nodeDragOver(e: DragEvent, i: number) {
		e.preventDefault()
		if (!dragData) return
		if (dragData.i !== i) {
			tags = tags.filter(t => t !== dragData.tag)
			tags = [...tags.slice(0, i), dragData.tag, ...tags.slice(i)]
			dragData.i = i
			focusNode(i, dragData.tag.length + 1)
		}
	}

	function nodeDragEnd() {
		dragData = null
	}

	function checkWidth() {
		if (currentTag.length > 20) {
			currentTag = currentTag.slice(0, 20)
		}
	}
</script>

<div class="tagInput">
	<div
		class="tagInput__tagContener"
		bind:this={tagsElement}
	>
		{#each tags as tag, i}
			<Tag
				bind:value={tag}
				on:input={() => cancelSpace(i)}
				on:keydown={tagsInputKeydown(i)}
				on:close={() => (tags = tags.filter(t => t !== tag))}
				on:dragstart={() => nodeDragStart(i)}
				on:dragover={e => nodeDragOver(e, i)}
				on:dragend={nodeDragEnd}
			/>
		{/each}
		<span class="tagInput__tagContener__input">
			{currentTag}
			<input
				type="text"
				placeholder={tags.length === 0 ? placeholder : ""}
				{id}
				bind:value={currentTag}
				bind:this={inputElement}
				on:keydown={mainInputKeypress}
				on:input={checkWidth}
			/>
		</span>
	</div>
</div>

<style lang="scss">
	.tagInput {
		background-color: white;
		border: 1px solid var(--primary-color);
		border-radius: 5px;
		padding: 5px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		&__tagContener {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			justify-content: flex-start;

			&__input {
				min-width: 2ch;
				height: 1em;
				position: relative;
				padding: 2px;
				margin-bottom: 5px;
				color: transparent;

				input {
					border: none;
					position: absolute;
					background-color: transparent;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;

					&:focus {
						outline: none;
					}
				}
			}
		}
	}
</style>
