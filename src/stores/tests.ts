import { writable } from "svelte/store"
import type { test } from "../utils/types"

export const testStore = writable<test[]>([])
