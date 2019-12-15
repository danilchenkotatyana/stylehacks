import React from 'react';
import Select, { components } from 'react-select';
import styles from './header.scss';

const DropdownIndicator = ( props ) => {
	return (
		<components.DropdownIndicator {...props}>
			<div className={styles.arrow} />
		</components.DropdownIndicator>
	);
};
export default DropdownIndicator;