export default  {
	container: (styles, state) => {
		return {
			...styles,
			display: 'inline-block'
		}
	},
	control: (styles) => {
		return {
			...styles,
			backgroundColor: 'black',
			border: 'none',
			padding: '0 0 0 .5rem',
			minHeight: '2rem',
			boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
			minWidth: '100px'
		}
	},
	singleValue: (styles) => {
		return {
			...styles,
			color: 'white',
			overflow: 'hidden',
			position: 'relative',
			margin: '0 8px 0 0',
			top: '0',
			transform: 'none',
			lineHeight: '2rem',
			maxWidth: '250px',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis'
		}
	},
	valueContainer: (styles, state) => {
		return {
			...styles,
			padding: '0',
			margin: '0',
			backgroundColor: state.isSelected ? 'black' : 'rgba(0, 0, 0, 0.5)'
		}
	},
	option: (styles, state) => {
		return {
			...styles,
			color: state.isSelected || state.isFocused ? 'black' : 'rgba(0, 0, 0, 0.5)',
			backgroundColor: state.isSelected ? 'transparent' : 'transparent',
			cursor: 'pinter'
		}
	},
	menu: (styles) => {
		return {
			...styles,
			backgroundColor: 'rgba(246, 246, 248, .9)',
			borderRadius: 3,
			boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
			minWidth: '150px',
			fontSize: '1.1rem',
			textAlign: 'left',
			margin: '0',
			left: 'auto',
			right: '0'
		}
	},
	menuList: (styles, state) => {
		return {
			...styles,
			backgroundColor: 'transparent'
		}
	},
	clearIndicator: (styles, state) => {
		return {
			...styles,
			color: 'white',
			backgroundColor: state.isFocused ? 'transparent' : 'white'
		}
	},
	indicatorsContainer: (styles, state) => {
		return {
			...styles,
			padding: state.isFocused ? '0' : '0',
			height: '2rem'
		}
	},
	indicatorContainer: (styles, state) => {
		return {
			...styles,
			padding: state.isFocused || state.isSelected ? '0' : '0',
			height: '2rem'
		}
	},
	indicatorSeparator: (styles) => {
		return {
			...styles,
			display: 'none'
		}
	},
	input: (styles, state) => {
		return {
			...styles,
			padding: '0',
			margin: '0',
			lineHeight: '2rem',
			color: state.isFocused || state.isSelected ? 'transparent' : 'black',
			backgroundColor: state.isFocused || state.isSelected ? 'transparent' : 'white'
		}
	}
};