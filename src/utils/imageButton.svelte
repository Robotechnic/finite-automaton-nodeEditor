<svelte:options immutable={true} />

<script lang="ts">
	export let src: string
	export let label: string
</script>

<button
	on:click
	on:keypress
	title={label}
>
	<img
		{src}
		alt={label}
	/>
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #9e9e9e;
		border: none;
		border-radius: 5px;
		padding: 10px 20px;
		color: #fff;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		aspect-ratio: 1/1;
		padding: 10px;
		border: solid 1px #757575;

		&:hover {
			background-color: #757575;
		}

		&:active {
			transform: scale(0.95);
		}

		img {
			width: 2rem;
			height: 2rem;
		}
	}
</style>
