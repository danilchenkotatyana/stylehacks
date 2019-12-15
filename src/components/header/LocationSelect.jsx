import React, { useState } from 'react';
import Popup from "reactjs-popup";
import AsyncSelect from 'react-select/async';
import states from 'us-state-codes';

import SelectLocationStyles from './SelectLocationStyles.jsx';
import DropdownIndicator from './DropdownIndicator.jsx';

import styles from './header.scss';

const getCityName = (properties) => {
	if (properties.city) {
		return properties.city;
	} else if (properties.name) {
		return properties.name;
	}
}

const isUsa = (properties) => {
	const ret = ['United States of America', 'US', 'USA'].includes(properties.country);
	return ret;
}

const getDisplayName = (properties) => {
	const cityname = getCityName(properties);
	if (isUsa(properties)) {
		const state = states.getStateCodeByStateName(properties.state) || properties.state;
		return cityname + (state ? ', ' + state : '');
	} else {
		return cityname;
	}
}

const search = async (value, cb) => {
	if (!value) {
		return await cb([]);
	}
	let url = '//photon.komoot.de/api/?q=' + encodeURIComponent(value) + '&lat=37.47&lon=-122.25';
	if (/^\d+$/.test(value)) {
		url += '&osm_tag=place:postcode';
	} else {
		url += '&osm_tag=place:city';
	}
	const entries = new Set();
	const response = await fetch(url);
	const items = await response.json();
	const values = [];
	for (const o of items.features) {
		const t = transform(o);
		if (!entries.has(t.name)) {
			entries.add(t.name);
			values.push({ label: t.name, value: t });
		}
	}
	return await cb(values);
};

const transform = (feature) => {
	let state = null;
	let country = feature.properties.country;
	if (isUsa(feature.properties)) {
		state = states.getStateCodeByStateName(feature.properties.state) || feature.properties.state;
		country = 'USA';
	}
	return {
		coordinates: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
		name: getDisplayName(feature.properties),
		city: getCityName(feature.properties),
		state: state,
		country: country
	};
};

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

const LocationSelect = ({ preferences, onLocationChange }) => {

	const [popupOpen, setPopupOpen] = useState(false);

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
			<div className={!location ? "" : selectStyle} onClick={() => { setPopupOpen(true) }}>
				{label}
				<div className={styles.arrow} />
			</div>
			<Popup
				className={styles['select__box']}
				position={["top center", "bottom right", "bottom left"]}
				open={popupOpen}
				on="click"
				onClose={onClose}
				closeOnDocumentClick
				mouseLeaveDelay={300}
				mouseEnterDelay={0}
				contentStyle={{ padding: "0", border: "none" }}
				arrow={false}
				modal ={false}
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
						components={{ DropdownIndicator }}
						controlShouldRenderValue={false}

					/>
				</div>
			</Popup>
		</div>);
};

export default LocationSelect;
