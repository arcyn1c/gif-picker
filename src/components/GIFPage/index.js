import React from "react"

import GIF from "../GIF"

import styles from "./styles"

export default function GIFPage({ header, gifs = [] }) {

	return <div style={styles.container}>
		{header && <h2 style={styles.header}>{header}</h2>}

		<div style={styles.pageContainer}>
			{gifs.map(({ id, title, url, mp4 }) => <GIF title={title} url={url} mp4={mp4} key={id} />)}
		</div>
	</div>
}