export default {
	container: {
		flex: 1,
		height: `200px`,
		minWidth: `200px`,
		margin: `0.5em`,
		backgroundColor: `rgba(0, 0, 0, 0.5)`,
		paddingBottom: `50px`,
		borderRadius: `8px`,
		boxShadow: `0 3px 10px rgba(0, 0, 0, 0.5)`,
		border: `1px solid rgba(255, 255, 255, 0.1)`,
		overflow: `hidden`
	},

	video: {
		width: `100%`,
		height: `100%`,
		objectFit: `cover`
	},

	buttonContainer: {
		display: `flex`,
		justifyContent: `spaceBetween`,
		alignItems: `center`,
		height: `50px`,
		margin: `0 0.5em`
	},

	copyButton: {
		whiteSpace: `nowrap`,
		cursor: `pointer`
	},

	urlInput: {
		flex: 1,
		background: `none`,
		fontSize: `1em`,
		textOverflow: `ellipsis`,
		overflow: `hidden`,
		whiteSpace: `nowrap`,
		margin: `0 0.3em`,
		color: `rgba(255, 255, 255, 0.8)`
	}
}