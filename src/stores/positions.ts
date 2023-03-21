import { writable } from "svelte/store"
import type { point } from "../utils/types"

export const originPosition = writable<point>({ x: 0, y: 0 })
export const mousePosition = writable<point>({ x: 0, y: 0 })
export const relativeMousePosition = writable<point>({ x: 0, y: 0 })
