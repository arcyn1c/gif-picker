import React from "react"

import searchIcon from "../../assets/searchIcon.png"

import styles from "./styles"
import "./styles.css"

export default function SearchInput({ isSearching = false, onChange = (_searchTerm) => { } }) {

	function handleChange(e) {
		onChange(e.target.value)
	}

	return <div style={styles.container}>
		<img style={styles.icon} src={searchIcon} alt="search-input-icon" />

		<input style={styles.input} type="text" placeholder="Whatcha lookin' for?" maxLength={50} autoFocus onChange={handleChange} />

		{isSearching && <div style={styles.loader} className="loader" />}
	</div>
}