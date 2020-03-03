import React, {useState} from 'react';
import Select from 'react-select';
import SelectStyles from './SelectStyles.jsx';
import DropdownIndicator from './DropdownIndicator.jsx';

import styles from './header.scss'

const GenderSelect = ({preferences, onGenderChange}) => {

	const options = [
		/*{
			value: '',
			label: 'Please choose'
		},*/
		{
			value: 'woman',
			label: 'woman'
		},
		{
			value: 'man',
			label: 'man'
		},
		{
			value: 'non-binary',
			label: 'non-binary'
		}
	];

	const selectedOption = (gender) => {
		for (const o of options) {
			if (o.value === gender) {
				return o;
			}
		}
		return null;
	};

	return (
		<Select value={selectedOption(preferences.gender)}
				onChange={onGenderChange(preferences)}
				options={options}
				isSearchable={false}
				className={styles['select']}
				classNamePrefix={styles['select__elements']}
				styles={SelectStyles}
				components={{ DropdownIndicator }}
			/>
	);
}


export default GenderSelect;
