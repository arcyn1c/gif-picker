import React, { useRef, useState } from "react"

import "../styles/GIF.css"

export default function GIF({ title, url, mp4 }) {
	const urlRef = useRef(null)

	const [copied, setCopied] = useState(false)

	function copyToClipboard(e) {
		urlRef.current.select()
		document.execCommand(`copy`)

		setCopied(true)

		setTimeout(() => setCopied(false), 3000)
	}

	return <div className="GIF">
		<video autoPlay loop title={title}>
			<source type="video/mp4" src={mp4}></source>
		</video>
		<div className="button-container">
			<input type="text" ref={urlRef} value={url} readOnly />

			{document.queryCommandSupported(`copy`) && <button onClick={copyToClipboard}>{copied ? `Copied!` : `Copy`}</button>}
		</div>
	</div>
}