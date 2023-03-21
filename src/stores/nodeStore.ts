import { writable, get } from "svelte/store"
import  { Connection } from "../connections/connection"
import type { node } from "../utils/types"
import { originPosition } from "./positions"

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

	function clearStore() {
		get(baseStore).forEach(node => {
			node.events.forEach(event => {
				if (event[1] !== null) {
					event[1].setEndNode(null)
					event[1].setStartNode(null)
					event[1].display = false
				}
			})
		})
		set([])
	}

	return {
		subscribe,
		set,
		update,
		hasState,
		clearStore,
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
				return nodes.filter(n => {
					if (n !== node) return true
					// Remove all connections from this node
					n.inputConnections.forEach(connection => {
						connection.setEndNode(null)
						connection.display = false
					})
					n.events.forEach(event => {
						if (event[1] !== null) {
							event[1].setEndNode(null)
							event[1].setStartNode(null)
							event[1].display = false
						}
					})
					return false
				})
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
			clearStore()
			const nodeMap = new Map<string, node>()
			const averagePos = { x: 0, y: 0 }
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
				averagePos.x += node.position.x
				averagePos.y += node.position.y
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
			
			// get the offset from 0 0 to get it centered
			averagePos.x /= json.length
			averagePos.y /= json.length
			averagePos.x *= -1
			averagePos.y *= -1
			averagePos.x += window.innerWidth / 2
			averagePos.y += window.innerHeight / 2
			originPosition.set(averagePos)
		}

	}
}

type StateUpdater = {
	isActive: () => boolean
	newMousePos: (x: number, y: number) => void
}
export const activeState = writable<StateUpdater>(null)
export const nodeStore = createStateStore()
