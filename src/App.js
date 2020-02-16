import React, { useState, useEffect } from 'react'

import GIPHY from "./services/giphy"

import SearchInput from './components/SearchInput'
import GIF from "./components/GIF"

import './App.css'
import GIFPage from './components/GIFPage'

async function getRandomGIFs() {
	const gifs = await Promise.all([
		GIPHY.random(),
		GIPHY.random(),
		GIPHY.random()
	])

	return gifs
}

function App() {
	const [
		[randomGifs, setRandomGIFs],
		[searchResults, setSearchResults]
	] = [useState([]), useState([])]

	useEffect(() => {
		async function fetchRandomGIFs() {
			const results = await getRandomGIFs()
			console.log(results)
			setRandomGIFs(results)
		}

		fetchRandomGIFs()
	}, [setRandomGIFs])

	async function search(term = ``) {
		const results = await GIPHY.search(term)
		setSearchResults(results)
	}

	const hasSearchResults = searchResults.length > 0

	return (
		<div className="App">
			<header className="App-header">
				<h1>GIF Picker</h1>
				<i>Search for GIFs or pick a random one from below</i>

				<SearchInput onChange={search} />
			</header>

			<GIFPage header={hasSearchResults ? `Search Results` : `Random`} gifs={hasSearchResults ? searchResults : randomGifs} />
		</div>
	)
}

export default App
