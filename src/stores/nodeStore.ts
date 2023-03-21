import { writable, get } from "svelte/store"
import  { Connection } from "../connections/connection"
import type { node } from "../utils/types"

type nodeJSON = {
	name: string,
	entryNode: boolean,
	events: {name: string, action : string | null}[],
	position: { x: number, y: number }
}

function createStateStore() {
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
		deleteStateByName(name: string) {
			update(nodes => {
				return nodes.filter(node => node.name !== name)
			})
		},
		deleteState(node: node) {
			update(nodes => {
				return nodes.filter(n => n !== node)
			})
		},
		toJSON(): nodeJSON[] {
			return get(baseStore).map(state => {
				return {
					name: state.name,
					entryNode: state.entryNode,
					events: state.events.map((event) => {
						return {
							name: event[0],
							action: event[1].getEndNode()?.name ?? null
						}
					}),
					position: state.position,
				}
			})
		},
		fromJSON(json: nodeJSON[]) {
			const nodeMap = new Map<string, node>()
			// Create all nodes
			json.forEach((state: nodeJSON) => {
				const node : node = {
					name: state.name,
					entryNode: state.entryNode,
					events: state.events.map((event) => {
						return [event.name, null]
					}),
					position: state.position,
					inputConnections: []
				}
				nodeMap.set(node.name, node)
				this.createState(node)
			})

			// Set all actions
			json.forEach((state: nodeJSON) => {
				const start = nodeMap.get(state.name)
				for (let i = 0; i < state.events.length; i++) {
					const end = nodeMap.get(state.events[i].action)
					if (end !== undefined) {
						start.events[i][1] = new Connection(start, end)
						end.inputConnections.push(start.events[i][1])
					}
				}
			})
		}

	}
}

type StateUpdater = {
	isActive: () => boolean
	newMousePos: (x: number, y: number) => void
}
export const activeState = writable<StateUpdater>(null)
export const nodeStore = createStateStore()
