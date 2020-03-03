import React, { useState } from 'react';
import Select from 'react-select';
import SelectStyles from './SelectStyles.jsx';
import DropdownIndicator from './DropdownIndicator.jsx';

import styles from './header.scss'

const OPTIONS = [
	{ value: 'casual', label: 'Casual' },
	{ value: 'smart casual', label: 'Smart casual' },
	{ value: 'business', label: 'Business' },
	{ value: 'glam', label: 'Glam' },
	{ value: 'grunge', label: 'Grunge' },
	{ value: 'artsy', label: 'Artsy' },
	{ value: 'boho', label: 'Boho' }
];

const AgendaSelect = ({ agenda, onChange }) => {

	const selectedOption = (agenda) => {
		for (const o of OPTIONS) {
			if (o.value === agenda) {
				return o;
			}
		}
		return null;
	};

	return (
		<Select value={selectedOption(agenda)}
			onChange={onChange}
			options={OPTIONS}
			isSearchable={false}
			className={styles['select']}
			classNamePrefix={styles['select__elements']}
			styles={SelectStyles}
			components={{ DropdownIndicator }}
		/>
	);
}


export default AgendaSelect;
