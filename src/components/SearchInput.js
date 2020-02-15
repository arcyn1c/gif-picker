import React from "react"

import "../styles/SearchInput.css"

export default function SearchInput({ onChange = (_results) => { } }) {

	function handleChange(event) {
		onChange(event.target.value)
	}

	return <div className="SearchInput">
		<img src={require(`../assets/search-icon.png`)} alt="search-input-icon" />
		<input type="text" placeholder="Whatcha lookin' for?" maxLength={50} autoFocus onChange={handleChange} />
	</div>
}