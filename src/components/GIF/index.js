import React, { useRef, useState } from "react"
import LazyLoad from "react-lazyload"

import styles from "./styles"

export default function GIF({ key, title, url, mp4 }) {
	const urlRef = useRef(null)

	const [copied, setCopied] = useState(false)

	function copyToClipboard(e) {
		urlRef.current.select()
		document.execCommand(`copy`)

		setCopied(true)

		setTimeout(() => setCopied(false), 3000)
	}

	return <div key={key} style={styles.container}>
		<LazyLoad>
			<video style={styles.video} autoPlay loop title={title}>
				<source type="video/mp4" src={mp4}></source>
				Your browser doesn't support the video tag.
			</video>
		</LazyLoad>

		<div style={styles.buttonContainer}>
			<input style={styles.urlInput} type="text" ref={urlRef} value={url} title={url} readOnly />

			{/* Check whether the copy command is supported before showing copy button */}
			{document.queryCommandSupported(`copy`) && <button style={styles.copyButton} onClick={copyToClipboard}>{copied ? `Copied!` : `Copy`}</button>}
		</div>
	</div>
}