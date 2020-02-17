export default {
	container: {
		maxWidth: 300,
		height: 200,
		margin: `0.5em`,
		backgroundColor: `rgba(0, 0, 0, 0.5)`,
		paddingBottom: 50,
		borderRadius: 8,
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
		height: 50,
		margin: `0 0.5em`
	},

	copyButton: {
		whiteSpace: `nowrap`
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