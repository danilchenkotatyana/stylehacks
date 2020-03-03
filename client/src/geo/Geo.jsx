import states from 'us-state-codes';

export const search = async (value, cb) => {
	if (!value) {
		return await cb([]);
	}
	const zipSearch = /^\d+$/.test(value);
	let url = '//photon.komoot.de/api/?q=' + encodeURIComponent(value) + '&lat=37.47&lon=-122.25';
	if (zipSearch) {
		url += '&osm_tag=place:postcode&bbox=-171.79,18.92,-66.96,71.36';
	} else {
		url += '&osm_tag=place:city&osm_tag=place:town';
	}
	const entries = new Set();
	const response = await fetch(url);
	const items = await response.json();
	const values = [];
	for (const o of items.features) {
		if (zipSearch && !isUsa(o.properties)) {
			continue;
		}
		const t = transform(o);
		if (!entries.has(t.name)) {
			entries.add(t.name);
			values.push({ label: t.name, value: t });
		}
	}
	return await cb(values);
};

export const getByCoordinates = async (coords, cb) => {
	if (!coords) {
		return await cb(null);
	}
	let url = '//photon.komoot.de/reverse/?lat=' + encodeURIComponent(coords.latitude) + '&lon=' + encodeURIComponent(coords.longitude);

	const response = await fetch(url);
	const items = await response.json();
	for (const o of items.features) {
        return await cb(transform(o));
	}
	return await cb(null);
};

export const transform = (feature) => {
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

export const getCityName = (properties) => {
	if (properties.city) {
		return properties.city;
	} else if (properties.name) {
		return properties.name;
	}
}

export const isUsa = (properties) => {
	const ret = ['United States of America', 'US', 'USA'].includes(properties.country);
	return ret;
}

export const getDisplayName = (properties) => {
	const cityname = getCityName(properties);
	if (isUsa(properties)) {
		const state = states.getStateCodeByStateName(properties.state) || properties.state;
		return cityname + (state ? ', ' + state : '');
	} else {
		return cityname;
	}
}

