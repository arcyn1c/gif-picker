const apiKey = `1HtuTdKSbKUcEyVW0UQxhntyEQoI56gy`

/**
 * An object representing a GIF
 * @typedef {Object} GIF
 * @property {String} id A unique identifier
 * @property {String} url The url of the gif
 * @property {String} mp4 The url to the mp4 version of the gif
 * @property {String} title The title of the gif
 */

/**
 * A simple helper function for generating a GIPHY endpoint URL
 * @param {String} endpoint The specific endpoint to target within the GIPHY API
 * @returns {String} A string representing the full endpoint URL
 */
function endpointUrl(endpoint) {
	return `https://api.giphy.com/v1/gifs/${endpoint}?api_key=${apiKey}`
}


async function fetchAsync(...args) {
	const response = await fetch(...args)

	if (!response.ok) throw Error(`Unable to fetch results from GIPHY.`)

	const { data, pagination } = await response.json()

	return { data, pagination }
}

/**
 * @typedef {Object} SearchResponse
 * @property {Array<GIF>} data The results of the search
 * @property {Object} pagination Pagination data for the response
 */
/**
 * A function to perform a GIPHY API search
 * @param {String} searchTerm The term to search the GIPHY API for
 * @param {number} limit The number of results to return
 * @param {number} offset The offset at which the results will begin
 * @returns {SearchResponse} An object containing array of GIFs and pagination info
 */
export async function search(searchTerm = ``, limit = 6, offset = 0) {
	const { data, pagination } = await fetchAsync(`${endpointUrl(`search`)}&q=${(searchTerm).replace(/\s/g, `+`)}&limit=${limit}&offset=${offset}`)

	return {
		data: data.map(({ id, title, url, images: { original: { mp4 } } }) => ({ id, title, url, mp4 })),
		pagination
	}
}

/**
 * A function to perform a GIPHY API random request
 * @returns {GIF} A GIF
 */
export async function random() {
	const { data: { id, title, url, images: { original: { mp4 } } } } = await fetchAsync(`${endpointUrl(`random`)}`)

	return { id, title, url, mp4 }
}

export default {
	search,
	random
}
