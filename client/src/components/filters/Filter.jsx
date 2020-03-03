
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './filters.scss';

const rowClass = styles['filters__row'];
const activeClass = styles['active'];

const Filter = ({ label, options, values, onChange }) => {

	const reset = (e) => {
		e.preventDefault();
		e.stopPropagation();
		onChange([], []);
	}

	const update = (option) => {
		return (e) => {
			e.preventDefault();
			e.stopPropagation();
			let newvalues;
			let newoptions;
			if (values.includes(option.value)) {
				newvalues = values.filter((v) => v !== option.value);
				newoptions = options.filter((v) => v.value !== option.value);
			} else {
				newvalues = [...values, option.value];
				newoptions = [...options, option];
			}
			onChange(newvalues, newoptions);
		}
	}

	const renderOptions = () => {
		const ret = [];
		options.forEach((option) => {
			ret.push(renderOption(option));
		});
		return ret;
	}

	const renderOption = (option) => {
		const key = option.value + '.' + label;
		const active = values && values.includes(option.value);
		return (<div
			key={key}
			className={classNames(rowClass, { [`${activeClass}`]: active })}
			onClick={update(option)}>
			<div className={styles['filters__row-value']}>{option.label}</div>
			{active && <div className={styles['filters__row-reset']}>Delete</div>}
		</div>);
	}

	return (<div className={styles['filters__column']}>
		<div className={styles['filters__column-title']}>
			{label}
			<div className={styles['filters__column-reset']} onClick={reset}>Reset</div>
		</div>
		{renderOptions()}
	</div>);
}

export default Filter;