import React from "react"

import GIF from "./GIF"

import "../styles/GIFPage.css"

export default function GIFPage({ header, gifs = [] }) {

	return <div className="GIFPage">
		{header && <h2>{header}</h2>}

		<div className="page-container">
			{gifs.map(({ title, url, mp4 }, index) => <GIF title={title} url={url} mp4={mp4} key={`gif_${index}`} />)}
		</div>
	</div>
}