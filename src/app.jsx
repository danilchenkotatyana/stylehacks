import React, { useEffect, useState } from "react";
import styles from './styles/main.scss';

import Header from './components/header/Header.jsx';
import Gallery from './components/gallery/Gallery.jsx';
import Footer from './components/footer/Footer.jsx';

import { getOutfits, getOutfit, getPreferences, setPreferences } from './api/api.jsx';

const headerLabel = 'StyleHacks';


const CardsList = ({ outfits, outfitsLoader, loading, singleResult }) => {
	return (
		<main>
			<Gallery
				data={outfits}
				showFilters={true}
				outfitsLoader={outfitsLoader}
				loading={loading}
				singleResult={singleResult} />
			<Footer />
		</main>
	);
};

const App = () => {

	const [preferences, setPrefs] = useState({});
	const [outfits, setOutfits] = useState([]);
	const [weather, setWeather] = useState(null);
	const [targetDate, setTargetDate] = useState('');
	const [loading, setLoading] = useState(true);
	const [singleResult, setSingleResult] = useState(false);

	const fetchOutfits = async (date, reset) => {
		setLoading(true);
		const items = reset ? [] : outfits;
		getOutfits({ date }).then((data) => {
			if (data && data.outfits) {
				items.push(...data.outfits);
			}
			setOutfits(items);
			setWeather(data.weather);
			setLoading(false);
		});
	};

	const fetchOutfit = async (id) => {
		setLoading(true);
		const items = [];
		getOutfit(id).then((data) => {
			console.log('got', data);
			if (data && data.outfits) {
				items.push(...data.outfits);
			}
			console.log('items', items);
			setOutfits(items);
			setWeather(null);
			setLoading(false);
		});
	};

	useEffect(() => {
		getPreferences().then((preferences) => {
			setPrefs(preferences);
		});
		const id = window.location.hash && window.location.hash.length ?
			parseInt(window.location.hash.substring(1), 10) :
			NaN;
		console.log('id', id);
		if (!isNaN(id)) {
			setSingleResult(true);
			fetchOutfit(id);
		} else {
			fetchOutfits('', true);
		}
	}, []);


	const onFilter = (filter) => {
		setFilter(filter)
	};

	const [filter, setFilter] = useState({});
	const [showFilters, setShowFilters] = useState(true);

	const resetSingleResult = () => {
		history.replaceState('',
			document.title,
			window.location.pathname + window.location.search);
		setSingleResult(false);

	}
	const onGenderChange = (preferences) => {
		return async (option) => {
			if (preferences.gender != option.value) {
				resetSingleResult();
				preferences.gender = option.value;
				const v = await setPreferences(preferences);
				setPrefs(v);
				fetchOutfits(targetDate, true);
			}
		}
	};
	const onDateChange = async (date) => {
		if (date !== targetDate) {
			resetSingleResult();
			setTargetDate(date);
			fetchOutfits(date, true);
		}
	};
	const onLocationChange = async (option) => {
		console.log('location', option);
		if (preferences.lat != option.value.coordinates[0] ||
			preferences.lon != option.value.coordinates[1]) {
			resetSingleResult();
			preferences.location = option.value;
			const v = await setPreferences(preferences);
			setPrefs(v);
			fetchOutfits(targetDate, true);
		}
	};

	const outfitsLoader = async (page) => {
		console.log('loading page', page);
		await fetchOutfits(targetDate, false);
	}

	return (
		<div className={styles['main-content']}>
			<Header
				weather={weather}
				preferences={preferences}
				onGenderChange={onGenderChange}
				onDateChange={onDateChange}
				onLocationChange={onLocationChange}
				date={targetDate}
				filter={filter}
				onFilter={onFilter}
				label={headerLabel}
				showFilters={showFilters} />
			<CardsList outfits={outfits} outfitsLoader={outfitsLoader} loading={loading} singleResult={singleResult} />
		</div>);
};

export default App;