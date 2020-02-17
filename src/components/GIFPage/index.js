import React from "react"

import GIF from "../GIF"

import styles from "./styles"

export default function GIFPage({ header, gifs = [], totalCount, onLoadMore = () => { }, isLoading = false }) {

	return <div style={styles.container}>
		{header && <h2 style={styles.header}>{header}</h2>}

		<div style={styles.pageContainer}>
			{gifs.map(({ id, title, url, mp4 }) => <GIF key={id} id={id} title={title} url={url} mp4={mp4} />)}
		</div>

		{totalCount > 0 && <div style={styles.paginationContainer}>
			<div>{gifs.length} GIF{gifs.length === 1 ? `` : `s`} out of {totalCount}</div>
			{gifs.length < totalCount && <button onClick={onLoadMore}>{isLoading ? <div style={styles.loader} className="loader"></div> : `Load More`}</button>}
		</div>}
	</div>
}