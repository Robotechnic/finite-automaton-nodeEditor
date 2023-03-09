import { writable, get } from "svelte/store"
import type { node } from "./types"

function createStateStore () {
	const baseStore = writable<node[]>([])
	const { subscribe, set, update } = baseStore

	function hasState(name: string) {
		return get(baseStore).some(node => node.name === name)
	}

	return {
		subscribe,
		set,
		update,
		hasState,
		createState(node: node) {
			let created = false
			update(nodes => {
				if (!hasState(node.name)) {
					created = true
					nodes.push(node)
				}
				return nodes
			})
			return created
		},
		deleteState(name: string) {
			update(nodes => {
				return nodes.filter(node => node.name !== name)
			})
		}
	}
}

type StateUpdater = {
	isActive : () => boolean,
	newMousePos : (x : number, y : number) => void
}

export const activeState = writable<StateUpdater>(null)
export const nodeStore = createStateStore()