import React from 'react';
import { components } from 'react-select';
import styles from './header.scss';

const Control = (props) => {
	const onClick = (e) => {
		e.preventDefault();
		props.onGeoLocationRequest();
	}
	return (
		<>
			<div className={styles['location-icon']} onClick={onClick} />
			<components.Control {...props} />
		</>
	);
};
export default Control;