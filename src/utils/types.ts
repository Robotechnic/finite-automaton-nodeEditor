import type { Connection } from "../connections/connection"

export type point = {
	x: number
	y: number
}

export type node = {
	name: string
	entryNode: boolean
	events: [string, Connection][]
	position: point
	inputConnections: Connection[]
}
