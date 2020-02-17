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
const GIFS_PER_PAGE = 12
const SEARCH_DELAY = 1500

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
		if (searchResults.length === 0) return

		setSearchHistory({
			...searchHistory,

			[searchValue]: [...searchResults]
		})
	}, [searchHistory, searchResults, searchValue, setSearchHistory])

	const search = useCallback((term = ``) => {
		// hide any errors that were previously displaying
		setError(null)

		// cleanup the search term
		term = term.toLowerCase().trim()

		// clear any searches that were waiting to be run
		if (searchTimeout) clearTimeout(searchTimeout)

		const loadingMore = term === searchValue

		// save the current search history we aren't paging
		if (searchValue.length > 0 && !loadingMore) saveCurrentSearchToHistory()

		// clear out the results before searching
		if (term.length < 3) {
			setSearchValue(``)
			setSearchResults([])
			return
		}

		// wait to search in case the user is still typing
		searchTimeout = setTimeout(async () => {
			// show loader
			setSearching(true)

			// if we aren't just loading more pages, update the search value display
			if (!loadingMore) setSearchValue(term)

			try {
				// GIPHY request
				const { data: results, pagination } = await GIPHY.search(term, GIFS_PER_PAGE, loadingMore ? searchResults.length : 0)

				// if there are no results, show an error
				if (results.length === 0) {
					setError(`No results found.`)
					return
				}

				// update the search results
				setSearchResults(loadingMore ? [...searchResults, ...results] : results)
				// update the total search results count
				setSearchResultsTotal(pagination.total_count)
			}
			catch (error) {
				// show the error
				setError(error.message)
			}
			finally {
				// stop loading
				setSearching(false)
			}
		}, SEARCH_DELAY)

		// clear any lingering timeout on unmount
		return () => clearTimeout(searchTimeout)
	}, [searchValue, saveCurrentSearchToHistory, setSearchResults, setSearching, setSearchValue, searchResults, setSearchResultsTotal, setError])

	const showHistoryItem = useCallback((historyValue) => {
		// save the current search history before viewing other history item
		saveCurrentSearchToHistory()

		// update the search value to the selected history item
		setSearchValue(historyValue)
	}, [saveCurrentSearchToHistory, setSearchValue])

	const removeHistoryItem = useCallback((historyValue) => {
		// get rid of the history item
		const { ...updatedSearchHistory } = searchHistory
		delete updatedSearchHistory[historyValue]

		// update history
		setSearchHistory(updatedSearchHistory)

		// if the removed history item matches the current search value, clear results
		if (historyValue === searchValue) {
			setSearchValue(``)
			setSearchResults([])
		}
	}, [searchHistory, searchValue, setSearchHistory, setSearchResults, setSearchValue])

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

	// use history if available whenever the search value is updated
	useEffect(() => {
		if (Object.keys(searchHistory).includes(searchValue)) {
			setSearchResults(searchHistory[searchValue])
		}
	}, [searchHistory, searchValue, setSearchResults])


	const hasSearchResults = searchResults.length > 0
	const hasSearchHistory = Object.keys(searchHistory).length > 0

	return (
		<div style={styles.container}>

			{/* -- Header --*/}
			<header style={styles.headerContainer}>
				<h1 style={styles.header}>GIF Picker</h1>
				<i style={styles.instructions}>Search for GIFs or pick a random one from below</i>

				{/* -- Search Input -- */}
				<SearchInput onChange={search} isSearching={searching} />

				{/* -- Error --*/}
				{error && <p style={styles.error}>{error}</p>}

				{/* -- Search History --*/}
				{hasSearchHistory && <div style={styles.searchHistoryContainer}>{Object.keys(searchHistory).map(historyValue => <SearchHistoryItem value={historyValue} key={historyValue} onSelect={() => showHistoryItem(historyValue)} onRemove={() => removeHistoryItem(historyValue)} />)}</div>}

			</header>

			{/* -- The Page of GIFs --*/}
			<GIFPage header={hasSearchResults ? `Search Results for \`${searchValue}\`` : `Random`} gifs={hasSearchResults ? searchResults : randomGifs} totalCount={searchResultsTotal} onLoadMore={() => search(searchValue)} isLoading={searching} />
		</div>
	)
}

export default App
