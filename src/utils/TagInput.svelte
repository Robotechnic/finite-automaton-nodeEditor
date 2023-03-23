<script lang="ts">
	import { tick } from "svelte"
	import Tag from "./Tag.svelte"


	export let tags: string[]
	export let placeholder: string
	let currentTag: string = ""
	let inputElement: HTMLInputElement
	let tagsElement: HTMLDivElement
	let lastArrow = false

	function getNode(i: number) {
		return tagsElement.children[i].children[0].children[0] as HTMLInputElement
	}

	function cancelSpace(i: number) {
		if (tags[i].length === 0) {
			tags = tags.filter((_, j) => j !== i)
			if (tags.length === 0) {
				inputElement.focus()
			} else {
				tick().then(() => {
					if (i > 0)
						getNode(i - 1).focus()
					else
						getNode(0).focus()
				})
			}
		}
	}

	function tagsInputKeydown(i: number) {return (e: KeyboardEvent) => {
		if (e.key === " ") {
			e.stopPropagation()
			e.preventDefault()
			return
		}
		const target = e.currentTarget as HTMLInputElement
		if (e.key === "ArrowLeft") {
			lastArrow = target.selectionStart === 0 && i > 0
			if (lastArrow) {
				getNode(i - 1).focus()
			}
		}

		if (e.key === "ArrowRight") {
			lastArrow = target.selectionStart === target.value.length
			if (i < tags.length - 1) {
				if (lastArrow) {
					getNode(i + 1).focus()
				}
			} else if (lastArrow) {
				inputElement.focus()
			}
		}
	}}

	function inputKeyup(e: KeyboardEvent) {
		if (e.key === "ArrowLeft" && lastArrow) {
			lastArrow = false
			const textLength = this.value.length
			this.setSelectionRange(textLength, textLength)
		}
		if (e.key === "ArrowRight" && lastArrow) {
			lastArrow = false
			this.setSelectionRange(0, 0)
		}
	}

	function mainInputKeypress(e: KeyboardEvent) {
		if ((e.key === " " || e.key === "Enter") && currentTag.length > 0) {
			tags = [...tags, currentTag]
			currentTag = ""
			e.stopPropagation()
			e.preventDefault()
		}
		if ((e.key === "Backspace" || e.key === "ArrowLeft") && inputElement.selectionStart === 0 && tags.length > 0) {
			lastArrow = e.key === "ArrowLeft"
			console.log(tagsElement.children[tags.length - 1])
			const node = getNode(tags.length - 1)
			const curPos = tags[tags.length - 1].length + 1
			node.setSelectionRange(curPos, curPos)
			node.focus()
		}
	}
</script>

<div class="tagInput">
	<div class="tagInput__tagContener" bind:this={tagsElement}>
	{#each tags as tag, i}
		<Tag
			bind:value={tag}
			on:input={() => cancelSpace(i)}
			on:keyup={inputKeyup}
			on:keydown={tagsInputKeydown(i)}
			on:close={() => (tags = tags.filter(t => t !== tag))}
		/>
	{/each}
	</div>
	<input
		type="text"
		placeholder={tags.length === 0 ? placeholder : ""}
		bind:value={currentTag}
		bind:this={inputElement}
		on:keydown={mainInputKeypress}
		on:keyup={inputKeyup}
	/>
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
		}
	}
</style>
