import React, { useState, useEffect, useCallback } from 'react'

import GIPHY from "../../services/giphy"

import SearchInput from '../SearchInput'
import SearchHistoryItem from "../SearchHistoryItem"
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
const GIFS_PER_PAGE = 6

function App() {
	const [
		[randomGifs, setRandomGIFs],
		[searchValue, setSearchValue],
		[searchResults, setSearchResults],
		[searchResultsTotal, setSearchResultsTotal],
		[searching, setSearching],
		[searchHistory, setSearchHistory],
		[error, setError]
	] = [
			useState([]),
			useState(``),
			useState([]),
			useState(0),
			useState(false),
			useState({}),
			useState(null)
		]

	const saveCurrentSearchToHistory = useCallback(() => {
		setSearchHistory({
			...searchHistory,

			[searchValue]: [...searchResults]
		})
	}, [searchHistory, searchResults, searchValue, setSearchHistory])

	const search = useCallback((term = ``) => {
		term = term.toLowerCase().trim()

		if (searchTimeout) clearTimeout(searchTimeout)

		const loadingMore = term === searchValue

		if (searchValue.length > 0 && !loadingMore) {
			saveCurrentSearchToHistory()
		}

		if (term.length < 3) {
			setSearchResults([])
			return
		}

		searchTimeout = setTimeout(async () => {
			setSearching(true)

			if (!loadingMore) setSearchValue(term)

			try {
				const { data: results, pagination } = await GIPHY.search(term, GIFS_PER_PAGE, loadingMore ? searchResults.length : 0)

				setSearchResults(loadingMore ? [...searchResults, ...results] : results)
				setSearchResultsTotal(pagination.total_count)
			}
			catch (error) {
				setError(error.message)
			}
			finally {
				setSearching(false)
			}
		}, 1000)

		return () => clearTimeout(searchTimeout)
	}, [searchValue, saveCurrentSearchToHistory, setSearchResults, setSearching, setSearchValue, searchResults, setSearchResultsTotal, setError])

	const showHistoryItem = useCallback((historyValue) => {
		saveCurrentSearchToHistory()

		setSearchValue(historyValue)
	}, [saveCurrentSearchToHistory, setSearchValue])

	const removeHistoryItem = useCallback((historyValue) => {
		const { ...updatedSearchHistory } = searchHistory
		delete updatedSearchHistory[historyValue]

		setSearchHistory(updatedSearchHistory)
	}, [searchHistory, setSearchHistory])

	// show random gifs on mount
	useEffect(() => {
		async function fetchRandomGIFs() {
			try {
				const results = await getRandomGIFs()
				setRandomGIFs(results)
			}
			catch (error) {
				setError(error)
			}
		}

		fetchRandomGIFs()
	}, [setError, setRandomGIFs])

	// use history if available
	useEffect(() => {
		if (Object.keys(searchHistory).includes(searchValue)) {
			setSearchResults(searchHistory[searchValue])
		}
	}, [searchHistory, searchValue, setSearchResults])


	const hasSearchResults = searchResults.length > 0
	const hasSearchHistory = Object.keys(searchHistory).length > 0

	return (
		<div style={styles.container}>
			<header style={styles.headerContainer}>
				<h1 style={styles.header}>GIF Picker</h1>
				<i style={styles.instructions}>Search for GIFs or pick a random one from below</i>

				<SearchInput onChange={search} isSearching={searching} />

				{error && <p style={styles.error}>{error}</p>}

				{hasSearchHistory && <div style={styles.searchHistoryContainer}>{Object.keys(searchHistory).map(historyValue => <SearchHistoryItem value={historyValue} key={historyValue} onSelect={() => showHistoryItem(historyValue)} onRemove={() => removeHistoryItem(historyValue)} />)}</div>}
			</header>

			<GIFPage header={hasSearchResults ? `Search Results for \`${searchValue}\`` : `Random`} gifs={hasSearchResults ? searchResults : randomGifs} totalCount={searchResultsTotal} onLoadMore={() => search(searchValue)} isLoading={searching} />
		</div>
	)
}

export default App
