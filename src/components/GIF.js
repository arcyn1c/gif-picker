import React from "react"

import "../styles/GIF.css"

export default function GIF({ url, mp4 }) {
	return <div className="GIF">
		<video autoPlay loop>
			<source type="video/mp4" src={mp4}></source>
		</video>
		<div className="button-container">
			<button>Copy URL</button>
		</div>
	</div>
}