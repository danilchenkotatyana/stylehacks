import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import AsyncSelect from 'react-select/async';

import SelectLocationStyles from './SelectLocationStyles.jsx';
import DropdownIndicator from './DropdownIndicator.jsx';
import Control from './Control';

import { getDisplayName, search } from '../../geo/Geo';

import styles from './header.scss';

const getLocationFromPreferences = (preferences) => {
	if (!preferences.location) {
		return null;
	}
	const location = {
		coordinates: [preferences.location.coordinates[0], preferences.location.coordinates[1]],
		city: preferences.location.city,
		state: preferences.location.state,
		country: preferences.location.country
	};
	location.name = getDisplayName(location);
	const ret = {
		label: location.name,
		value: location
	};
	return ret;
};

const LocationSelect = ({ preferences,
	onLocationChange,
	onGeoLocationRequest,
	onLocationPopupOpen,
	popupOpen,
	setPopupOpen }) => {

	const location = getLocationFromPreferences(preferences);
	const defaultOptions = location ? [location] : null;

	const label = location ? location.value.name : '...';

	const onClose = () => {
		setPopupOpen(false);
	};

	const onSelect = async (option) => {
		setPopupOpen(false);
		await onLocationChange(option);
	};

	const selectStyle = styles['select__title'];
	return (
		<div className={styles['select']}>
			<Popup
				className={styles['select__box']}
				trigger={open => (
					<div className={!location ? "" : selectStyle} onClick={() => { setPopupOpen(true) }}>
						{label}
						<div className={styles.arrow} />
					</div>
				)}
				position={["bottom right"]}
				open={popupOpen}
				on="click"
				onOpen={onLocationPopupOpen}
				onClose={onClose}
				closeOnDocumentClick
				mouseLeaveDelay={300}
				mouseEnterDelay={0}
				contentStyle={{ padding: "0", border: "none" }}
				arrow={false}
				keepTooltipInside
			>
				<div className={styles['select__box']}>
					<div>Type your zip code or city to see outfits for your weather!</div>
					<AsyncSelect
						value={location}
						cacheOptions
						loadOptions={search}
						defaultOptions={defaultOptions}
						menuIsOpen={true}
						onChange={onSelect}
						styles={SelectLocationStyles}
						className={styles['select__input-box']}
						components={{
							DropdownIndicator,
							Control: (props) => <Control {...props} onGeoLocationRequest={onGeoLocationRequest} />
						}}
						controlShouldRenderValue={false}
					/>
				</div>
			</Popup>
		</div>);
};

export default LocationSelect;
