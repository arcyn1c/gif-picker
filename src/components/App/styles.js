export default {
	container: {
		position: `relative`,
		textAlign: `center`
	},

	headerContainer: {
		backgroundColor: `#282c34`,
		display: `flex`,
		flexDirection: `column`,
		alignItems: `center`,
		justifyContent: `center`,
		color: `white`,
		padding: `3em 1em 1em`,
		borderBottom: `1px solid rgba(255, 255, 255, 0.1)`
	},

	header: {
		fontSize: `5em`,
		lineHeight: 1,
		textShadow: `0 3px 10px rgba(0, 0, 0, 0.5)`,
		whiteSpace: `wrap`,
		padding: 0,
		margin: `0 0 0.2em`

	},

	instructions: {
		fontSize: `1em`,
		fontWeight: `bold`,
		color: `rgba(255, 255, 255, 0.7)`,
		marginBottom: `2em`
	},

	error: {
		color: `#e6446f`,
		margin: `2em 0.5em`
	},

	searchInputContainer: {
		display: `flex`,
		flexDirection: `row`
	},

	clearResultsButton: {
		margin: `0 0.5em`
	},

	searchHistoryContainer: {
		display: `flex`,
		maxWidth: 1000,
		margin: `2em 0.5em 0`,
		flexWrap: `wrap`
	},

	loader: {
		width: 15,
		height: 15,
		border: `2px dashed rgba(255, 255, 255, 0.6)`,
		borderRadius: 100
	}
}