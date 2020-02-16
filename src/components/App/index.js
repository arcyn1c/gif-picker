import React, { useState, useEffect } from 'react'

import GIPHY from "../../services/giphy"

import SearchInput from '../SearchInput'
import GIFPage from '../GIFPage'

import styles from './styles'

async function getRandomGIFs() {
	const gifs = await Promise.all([
		GIPHY.random(),
		GIPHY.random(),
		GIPHY.random()
	])

	return gifs
}

let searchTimeout

function App() {
	const [
		[randomGifs, setRandomGIFs],
		[searchResults, setSearchResults],
		[searching, setSearching]
	] = [useState([]), useState([]), useState(false)]

	useEffect(() => {
		async function fetchRandomGIFs() {
			const results = await getRandomGIFs()
			setRandomGIFs(results)
		}

		fetchRandomGIFs()
	}, [setRandomGIFs])

	function search(term = ``) {
		if (searchTimeout) clearTimeout(searchTimeout)

		setSearching(true)

		searchTimeout = setTimeout(async () => {
			const results = await GIPHY.search(term)
			setSearchResults(results)
			setSearching(false)
		}, 1000)
	}

	const hasSearchResults = searchResults.length > 0

	return (
		<div style={styles.container}>
			<header style={styles.headerContainer}>
				<h1 style={styles.header}>GIF Picker</h1>
				<i style={styles.instructions}>Search for GIFs or pick a random one from below</i>

				<SearchInput onChange={search} isSearching={searching} />
			</header>

			<GIFPage header={hasSearchResults ? `Search Results` : `Random`} gifs={hasSearchResults ? searchResults : randomGifs} />
		</div>
	)
}

export default App
