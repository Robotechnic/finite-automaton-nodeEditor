import type { automatonJSON } from "./types"

export function parseJSONFile(
	file: File,
	callback: (json: automatonJSON) => void
) {
	if (!file) return
	if (file.type !== "application/json") {
		alert("File is not a JSON file")
		return
	}
	const reader = new FileReader()
	reader.onload = e => {
		try {
			const json = JSON.parse(e.target.result as string) as automatonJSON
			callback(json)
		} catch (e) {
			console.error(e)
			alert("Error parsing JSON file")
		}
	}
	reader.onerror = e => {
		console.error(e)
		alert("Error parsing JSON file")
	}

	reader.readAsText(file)
}
