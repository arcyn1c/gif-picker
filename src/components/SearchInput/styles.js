import appStyles from "../App/styles"

export default {
	container: {
		position: `relative`
	},

	input: {
		padding: `0.3em 35px`
	},

	icon: {
		position: `absolute`,
		width: 30,
		height: 30,
		top: `50%`,
		marginTop: -15,
		marginLeft: 5,
		color: `white`,
		filter: `invert()`
	},

	loader: {
		...appStyles.loader,

		position: `absolute`,
		right: 0,
		top: `50%`,
		marginTop: -7.5,
		marginRight: 7.5
	}
}