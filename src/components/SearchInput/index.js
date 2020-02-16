import React from "react"

import searchIcon from "../../assets/searchIcon.png"

import styles from "./styles"

export default function SearchInput({ onChange = (_results) => { } }) {

	function handleChange(event) {
		onChange(event.target.value)
	}

	return <div style={styles.container}>
		<img style={styles.icon} src={searchIcon} alt="search-input-icon" />

		<input style={styles.input} type="text" placeholder="Whatcha lookin' for?" maxLength={50} autoFocus onChange={handleChange} />

		<div style={styles.loader} />
	</div>
}