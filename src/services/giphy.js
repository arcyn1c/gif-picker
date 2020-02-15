import { urlencoded } from "body-parser"

const apiKey = `1HtuTdKSbKUcEyVW0UQxhntyEQoI56gy`

/**
 * A simple helper function for generating a GIPHY endpoint URL
 * @param {String} endpoint The specific endpoint to target within the GIPHY API
 * @returns {String} A string representing the full endpoint URL
 */
function endpointUrl(endpoint) {
	return `api.giphy.com/v1/gifs/${endpoint}?api_key=${apiKey}`
}

/**
 * A function to perform a GIPHY API search
 * @param {String} searchTerm The term to search the GIPHY API for
 * @returns {Array} An array of GIFs
 */
export async function search(searchTerm = ``) {
	if (!searchTerm) return []

	const response = await fetch(`${endpointUrl(`search`)}&q=${urlencoded(searchTerm)}`)

	return response
}

export default {
	search
}

export async function random() {
	const response = await fetch(`${endpointUrl(`random`)}`)

	if (!response.ok) throw Error(response.data)

	return response.data
}