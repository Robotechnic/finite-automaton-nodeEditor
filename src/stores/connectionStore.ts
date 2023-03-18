import { writable } from "svelte/store"
import type { Connection } from "../connections/connection"

export const currentConnection = writable<Connection | null>(null)
