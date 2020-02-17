import React from "react"

import styles from "./styles"

export default function SearchHistoryItem({ value, onSelect = () => { }, onRemove = () => { } }) {

	return <button style={styles.container}>
		<div style={styles.label} onClick={onSelect}>{value}</div>
		<i style={styles.removeButton} className="close-icon" onClick={onRemove} />
	</button>
}