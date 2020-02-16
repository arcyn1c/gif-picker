import React, { useRef, useState } from "react"

import styles from "./styles"

export default function GIF({ title, url, mp4 }) {
	const urlRef = useRef(null)

	const [copied, setCopied] = useState(false)

	function copyToClipboard(e) {
		urlRef.current.select()
		document.execCommand(`copy`)

		setCopied(true)

		setTimeout(() => setCopied(false), 3000)
	}

	return <div style={styles.container}>
		<video style={styles.video} autoPlay loop title={title}>
			<source type="video/mp4" src={mp4}></source>
		</video>

		<div style={styles.buttonContainer}>
			<input style={styles.urlInput} type="text" ref={urlRef} value={url} title={url} readOnly />

			{/* Check whether the copy command is supported before showing copy button */}
			{document.queryCommandSupported(`copy`) && <button style={styles.copyButton} onClick={copyToClipboard}>{copied ? `Copied!` : `Copy`}</button>}
		</div>
	</div>
}