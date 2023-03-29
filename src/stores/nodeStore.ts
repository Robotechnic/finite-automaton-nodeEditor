import { writable, get } from "svelte/store"
import { Connection } from "../connections/connection"
import type { node, nodeJSON, automatonJSON } from "../utils/types"
import { originPosition } from "./positions"
import { testStore } from "./tests"

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

	function computeTheoreticalHeight(node: node) {
		return 207.5 + 29 * node.events.length
	}

	function computeTheoreticalWidth(node: node) {
		const width = Math.max(234, node.name.length * 15.80585)
		let eventWidth = 0
		node.events.forEach(event => {
			eventWidth = Math.max(eventWidth, event[0].length * 9.92335)
		})
		return width + eventWidth
	}

	function createState(node: node) {
		let created = false
		update(nodes => {
			if (!hasState(node.name)) {
				created = true
				nodes.push(node)
			}
			return nodes
		})
		return created
	}

	return {
		subscribe,
		set,
		update,
		hasState,
		clearStore,
		computeTheoreticalHeight,
		computeTheoreticalWidth,
		createState,
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
		toJSON(): automatonJSON {
			return {
				automaton: get(baseStore).map(state => {
					state.name = state.name.slice(0, 20)
					return {
						name: state.name,
						entryNode: state.entryNode,
						events: state.events.map(event => {
							return {
								name: event[0],
								action: event[1].getEndNode()?.name ?? null,
							}
						}),
						position: state.position,
					}
				}),
				tests: get(testStore),
			}
		},
		toAutomaton(): string {
			let automaton = ""
			let entryNode = ""
			get(baseStore).forEach(state => {
				if (state.entryNode) {
					entryNode += "->" + state.name + "\n"
				}
				state.events.forEach(event => {
					console.log(event)
					if (event[1] !== null) {
						automaton += `${state.name}:${event[0]}->${
							event[1].getEndNode().name
						}\n`
					} else {
						automaton += `${state.name}:${event[0]}->${state.name}\n`
					}
				})
			})

			if (entryNode === "") {
				alert("There is no entry point for the automaton!")
				return null
			}

			get(testStore).forEach(test => {
				automaton += ":"
				test.input.forEach((event, index) => {
					automaton += event
					if (index !== test.input.length - 1) {
						automaton += ","
					}
				})
				automaton += `->${test.expectedState}\n`
			})

			return entryNode + automaton
		},
		fromJSON(json: automatonJSON) {
			clearStore()
			const nodeMap = new Map<string, node>()
			const averagePos = { x: 0, y: 0 }
			// Create all nodes
			json.automaton.forEach((state: nodeJSON) => {
				const node: node = {
					name: state.name,
					entryNode: state.entryNode,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					events: state.events.map(event => {
						return [event.name, null]
					}),
					position: state.position,
					inputConnections: [],
				}
				nodeMap.set(node.name, node)
				createState(node)
				averagePos.x +=
					node.position.x + computeTheoreticalWidth(node) / 2
				averagePos.y +=
					node.position.y + computeTheoreticalHeight(node) / 2
			})

			// Set all actions
			json.automaton.forEach((state: nodeJSON) => {
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
			averagePos.x /= json.automaton.length
			averagePos.y /= json.automaton.length
			averagePos.x *= -1
			averagePos.y *= -1
			averagePos.x += window.innerWidth / 2
			averagePos.y += window.innerHeight / 2
			originPosition.set(averagePos)

			// Set all tests
			testStore.set(json.tests)
		},
	}
}

type StateUpdater = {
	isActive: () => boolean
	newMousePos: (x: number, y: number) => void
}
export const activeState = writable<StateUpdater>(null)
export const nodeStore = createStateStore()
