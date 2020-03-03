
import React, { useEffect, useState } from 'react';
//import { CirclePicker } from 'react-color';
//https://casesandberg.github.io/react-color/

import Filter from './Filter.jsx';
import styles from './filters.scss';

const AGES = [
	{ value: '0-20', label: '0-20' },
	{ value: '21-32', label: '21-32' },
	{ value: '33-43', label: '33-43' },
	{ value: '44-53', label: '44-53' },
	{ value: '53+', label: '53+' }
];

const BODY_TYPES = [
	{ value: 'slim', label: 'Slim' },
	{ value: 'athletic', label: 'Athletic' },
	{ value: 'curvy', label: 'Curvy', gender: 'woman' },
	{ value: 'full figured', label: 'Full figured' }
];

const HAIRS = [
	{ value: 'black', label: 'Black' },
	{ value: 'brown', label: 'Brown' },
	{ value: 'blonde', label: 'Blonde' },
	{ value: 'red', label: 'Red' },
	{ value: 'neon', label: 'Neon' },
	{ value: 'bald', label: 'Bald', gender: ['man', 'non-binary'] }
];

const isGenderMatches = (gender, item) => {
	if (!item.gender) {
		return true;
	}
	if (typeof item.gender === 'string') {
		return gender === item.gender;
	}
	return item.gender.includes(gender);
}

const options = (items, gender) => {
	const ret = [];
	items.forEach((item) => {
		if (!isGenderMatches(gender, item)) {
			return;
		}
		ret.push(item);
	});
	return ret;
}

const Filters = ({
	preferences,
	ages,
	onAgesChange,
	bodyTypes,
	onBodyTypesChange,
	hairs,
	onHairsChange,
	productTypes,
	productTypesOptions,
	onProductTypesChange }) => {

	const [showFilter, setShowFilter] = useState(false);

	const toggleFilters = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setShowFilter(true);
		if (showFilter) {
			setShowFilter(false);
		}

	}

	//const colorsList = ["#000000", "#FFFFFF", "#CFD1CC", "#8C4B33", "#DEC79B", "#FF0920", "#FF9BA5", "#FD730E", "#FFFA16", "#367A46", "#3A7AE4", "#6820AE", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"];

	return <>
		<div className={styles.filters}>
			<div className={styles['filters__title']}>
				<div onClick={toggleFilters} className={styles['filters__button']}>Filters</div>
			</div>
			{showFilter && <div className={styles['filters__container']}>
				<div className={styles['filters__table']}>
					<Filter
						label="Age"
						options={options(AGES, preferences && preferences.gender)}
						values={ages}
						onChange={onAgesChange}
					/>
					<Filter
						label="Body Type"
						options={options(BODY_TYPES, preferences && preferences.gender)}
						values={bodyTypes}
						onChange={onBodyTypesChange}
					/>
					<Filter
						label="Hair"
						options={options(HAIRS, preferences && preferences.gender)}
						values={hairs}
						onChange={onHairsChange}
					/>
					{(productTypesOptions || []).length ? <Filter
						label="Product Type"
						options={productTypesOptions}
						values={productTypes}
						onChange={onProductTypesChange}
					/> : <></>}

					{/* <div className={styles['filters__column']}>
						<div className={styles['filters__column-title']}>
                         Color
							<div className={styles['filters__color-indicator']}>black</div>
							<div className={styles['filters__column-reset']}>Reset</div>
						</div>
						<div className={styles['filters__row']}>
							<CirclePicker
								// onChangeComplete={ handleChangeComplete }
								colors={ colorsList }
							/>
						</div>
					</div> */}
				</div>
				<div onClick={toggleFilters} className={styles['filters__close']}>
					Hide filters
				</div>
			</div>}
		</div>
	</>
};

export default Filters;
