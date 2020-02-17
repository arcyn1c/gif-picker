const apiKey = `1HtuTdKSbKUcEyVW0UQxhntyEQoI56gy`

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
 * A function to perform a GIPHY API search
 * @param {String} searchTerm The term to search the GIPHY API for
 * @returns {Array} An array of GIFs
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
 * @returns {GIF} An object representing a GIF
 */
export async function random() {
	const { data: { id, title, url, images: { original: { mp4 } } } } = await fetchAsync(`${endpointUrl(`random`)}`)

	return { id, title, url, mp4 }
}

export default {
	search,
	random
}
