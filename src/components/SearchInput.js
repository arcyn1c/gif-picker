import React from "react";

import "../styles/SearchInput.css"

export default function SearchInput() {
	return <div className="SearchInput">
		<img src={require("../assets/search-icon.png")} alt="search-input-icon"/>
		<input type="text" placeholder="What ya looking for?" maxlength={50} autofocus />
	</div>
}