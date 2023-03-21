import type { Connection } from "../connections/connection"

export type point = {
	x: number
	y: number
}

export type node = {
	name: string
	entryNode: boolean
	events: [string, Connection | null][]
	position: point
	inputConnections: Connection[]
}

export type nodeJSON = {
	name: string,
	entryNode: boolean,
	events: { name: string, action: string | null }[],
	position: { x: number, y: number }
}

export type test = {
	input: string[]
	expectedState: string
}
