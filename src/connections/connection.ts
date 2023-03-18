import { writable, get } from "svelte/store"
import type { Writable } from "svelte/store"
import type { node, point } from "../utils/types"
import type Connector from "../connections/Connector.svelte"

export class Connection {
	private _startPos: Writable<point>
	private _endPos: Writable<point>
	private _display = writable<boolean>(true)
	private _svgBounds: Writable<{ x: number; y: number; width: number; height: number }>
	private _svgPath: Writable<string>

	private startNode: node
	private endNode: node

	private endConnector: Connector

	static connectorRadius = 10


	constructor(startNode: node, endNode: node, display: boolean = null) {
		this.startNode = startNode
		this.endNode = endNode
		this.endConnector = null
		this._display.set(display ?? (startNode !== null && endNode !== null))
		this._startPos = writable({ x: 0, y: 0 })
		this._endPos = writable({ x: 0, y: 0 })
		this._svgBounds = writable(this.generateSvgBounds())
		this._svgPath = writable(this.generateSvgPath())
	}

	public initialised() {
		return this._startPos !== null && this._endPos !== null
	}

	mousePos(pos: point, display = true) {
		this.display = display
		if (this.startNode !== null) this.endPoint = pos
		else if (this.endNode !== null) this.startPoint = pos
	}

	update(position: point, fromEnd = false) {
		if (fromEnd) this.endPoint = position
		else this.startPoint = position
	}

	disconnect() {
		this.startNode = null
		this.endNode = null
	}

	setStartNode(startNode: node) {
		this.startNode = startNode
	}

	setEndNode(endNode: node, endConnector: Connector) {
		if (this.endConnector !== null && endNode === null) {
			this.endConnector.removeInputConnection(this)
		}
		this.endNode = endNode
		this.endConnector = endConnector
	}

	getEndConnector() {
		return this.endConnector
	}

	getStartNode() {
		return this.startNode
	}

	getEndNode() {
		return this.endNode
	}

	getStartPos() {
		return this._startPos
	}

	getEndPos() {
		return this._endPos
	}

	getDisplay() {
		return this._display
	}

	get startPoint() {
		return get(this._startPos)
	}

	set startPoint(pos: point) {
		if (!this.display) return
		this._startPos.set(pos)
		this._svgBounds.set(this.generateSvgBounds())
		this._svgPath.set(this.generateSvgPath())
	}

	get endPoint() {
		return get(this._endPos)
	}

	set endPoint(pos: point) {
		if (!this.display) return
		this._endPos.set(pos)
		this._svgBounds.set(this.generateSvgBounds())
		this._svgPath.set(this.generateSvgPath())
	}

	get display() {
		return get(this._display)
	}

	set display(display: boolean) {
		this._display.set(display)
	}

	private getHeight() {
		return Math.abs(this.startPoint.y - this.endPoint.y)
	}

	private getWidth() {
		return Math.abs(this.startPoint.x - this.endPoint.x)
	}

	/**
	 * compute the bounding box of the connection
	 * @returns {object} The bounding box of the connection with margins
	 */
	generateSvgBounds() {
		if (!this.initialised()) return null
		const pos = { x: 0, y: 0 }
		if (this.startPoint.x < this.endPoint.x) {
			pos.x = -this.getWidth()
		}
		if (this.startPoint.y < this.endPoint.y) {
			pos.y = -this.getHeight()
		}
		return {
			x: pos.x,
			y: pos.y,
			width: Math.max(this.getWidth(), 0) + Connection.connectorRadius * 2,
			height: Math.max(this.getHeight(), 0) + Connection.connectorRadius * 2
		}
	}

	getSvgBounds() {
		return this._svgBounds
	}

	/**
	 * Generate an SVG path in the form of a curve between the start and end point
	 * it takes into account the direction of the connectors and margins of 5px
	 *
	 * @returns {string} SVG path
	 */
	generateSvgPath() {
		if (!this.initialised()) return ""
		const start = { x: Connection.connectorRadius, y: Connection.connectorRadius }
		if (this.startPoint.x < this.endPoint.x) {
			start.x = this.getWidth() + Connection.connectorRadius
		}
		if (this.startPoint.y < this.endPoint.y) {
			start.y = this.getHeight() + Connection.connectorRadius
		}

		const end = { x: Connection.connectorRadius, y: Connection.connectorRadius }
		if (this.startPoint.x > this.endPoint.x) {
			end.x = this.getWidth() + Connection.connectorRadius
		}

		if (this.startPoint.y > this.endPoint.y) {
			end.y = this.getHeight() + Connection.connectorRadius
		}


		const diffX = Math.abs(end.x - start.x)

		const controlPoint1 = {
			x: start.x + diffX * 0.5,
			y: start.y
		}
		
		const controlPoint2 = {
			x: end.x - diffX * 0.5, 
			y: end.y
		}
		
		const controlPoint3 = {
			x: end.x,
			y: end.y
		}

		const controlPoint4 = {
			x: start.x + diffX * 0.1,
			y: start.y
		}

		return `
			M ${start.x} ${start.y} 
			C ${controlPoint1.x} ${controlPoint1.y}, 
			  ${controlPoint2.x} ${controlPoint2.y},
			  ${controlPoint3.x} ${controlPoint3.y},
			  ${controlPoint4.x} ${controlPoint4.y},
			  ${end.x} ${end.y}
		`


	}

	getSvgPath() {
		return this._svgPath
	}
}
