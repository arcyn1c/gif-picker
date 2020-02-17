import appStyles from "../App/styles"

export default {
	container: {
		position: `relative`,
		maxWidth: `960px`,
		margin: `1em auto`,
		display: `inline-flex`,
		flexDirection: `column`,
		justifyContent: `center`
	},

	header: {
		color: `white`,
		textShadow: `0 3px 10px rgba(0, 0, 0, 0.5)`,
		margin: `0.5em 0 0.25em 0.75em`,
		alignSelf: `flex-start`
	},

	pageContainer: {
		display: `flex`,
		flexWrap: `wrap`,
		justifyContent: `spaceBetween`
	},

	paginationContainer: {
		padding: `0.5em`,
		display: `flex`,
		justifyContent: `space-between`,
		alignItems: `center`,
		color: `white`
	},

	loader: appStyles.loader
}