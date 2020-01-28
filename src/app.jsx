import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import styles from './styles/main.scss';

import Header from './components/header/Header.jsx';
import StaticHeader from './components/header/StaticHeader.jsx';
import Footer from './components/footer/Footer.jsx';

import Geo from './components/geo/Geo.jsx';
import Main from './components/pages/Main.jsx';
import PrivacyPolicy from './components/pages/PrivacyPolicy.jsx';
import TermsOfService from './components/pages/TermsOfService.jsx';
import Filters from './components/filters/Filters.jsx';

import { getOutfits, getOutfit, getPreferences, setPreferences, like, dislike } from './api/api.jsx';


const headerLabel = 'StyleHacks';

const App = () => {

	const [preferences, setPrefs] = useState({});
	const [outfits, setOutfits] = useState([]);
	const [weather, setWeather] = useState(null);
	const [targetDate, setTargetDate] = useState('');
	const [loading, setLoading] = useState(true);
	const [singleResult, setSingleResult] = useState(false);
	const [geoCookies, setGeoCookies] = useCookies(['geo']);

	const fetchOutfit = async (id) => {
		setLoading(true);
		const items = [];
		getOutfit(id).then((data) => {
			if (data && data.outfits) {
				items.push(...data.outfits);
				setActiveItem(data.outfits[0]);
			}
			setOutfits(items);
			setWeather(null);
			setLoading(false);
		});
	};

	const fetchPage = async (reset) => {
		setLoading(true);
		const items = reset ? [] : outfits;
		const ids = new Set(items.map(v => v.outfit.id));
		const urls = new Set(items.map(v => v.outfit.image_url));
		if (reset) {
			setOutfits([]);
		}
		const isUnique = (v) => {
			if (ids.has(v.outfit.id)) {
				console.log('not unique id',
					v,
					items.find(x => x.outfit.id == v.outfit.id));
				return false;
			}
			if (urls.has(v.outfit.image_url)) {
				console.log('not unique image',
					v,
					items.find(x => x.outfit.image_url == v.outfit.image_url));
				return false;
			}
			ids.add(v.outfit.id);
			urls.add(v.outfit.image_url);
			return true;
		};

		const chunk = await getOutfits({ date: targetDate });
		if (chunk && chunk.weather) {
			setWeather(chunk.weather);
		}
		if (chunk && chunk.outfits) {
			items.push(...chunk.outfits.filter(isUnique));
			setOutfits(items);
		}
		setLoading(false);
	}

	const reload = async () => {
		await fetchPage(true);
	};

	useEffect(() => {
		getPreferences().then((preferences) => {
			setPrefs(preferences);
		});
		const id = window.location.hash && window.location.hash.length ?
			parseInt(window.location.hash.substring(1), 10) :
			NaN;
		if (!isNaN(id)) {
			setSingleResult(true);
			fetchOutfit(id);
		} else {
			fetchPage();
		}
	}, []);

	const onGeoLocationRequest = () => {
		setGeoCookies('geo', '');
	};

	const [activeItem, setActiveItem] = useState(null);

	const resetSingleResult = () => {
		history.replaceState('',
			document.title,
			window.location.pathname + window.location.search);
		setSingleResult(false);
		setActiveItem(null);

	}
	const onGenderChange = (preferences) => {
		return async (option) => {
			if (preferences.gender != option.value) {
				resetSingleResult();
				preferences.gender = option.value;
				const v = await setPreferences(preferences);
				setPrefs(v);
				fetchPage(true);
			}
		}
	};
	const onDateChange = async (date) => {
		if (date !== targetDate) {
			await resetSingleResult();
			await setTargetDate(date);
			fetchPage(true);
		}
	};
	const onLocationChange = async (option) => {
		if (preferences.lat != option.value.coordinates[0] ||
			preferences.lon != option.value.coordinates[1]) {
			resetSingleResult();
			preferences.location = option.value;
			const v = await setPreferences(preferences);
			setPrefs(v);
			fetchPage(true);
		}
	};

	const outfitsLoader = async () => {
		console.log('loading page');
		await fetchPage(false);
	}

	const onLike = async(outfitId) => {
		await like(outfitId);
	}

	const onDislike = async(outfitId) => {
		await dislike(outfitId);
		setOutfits(outfits.filter(o => o.outfit.id != outfitId));
	}

	return (
		<Router>
			<div className={styles['main-content']}>
				<Switch>
					<Route path="/pages/terms-of-service">
						<StaticHeader />
						<main>
							<TermsOfService />
							<Footer />
						</main>
					</Route>
					<Route path="/pages/privacy-policy">
						<StaticHeader />
						<main>
							<PrivacyPolicy />
							<Footer />
						</main>
					</Route>
					<Route path="/">
						<Geo
							cookies={geoCookies}
							setCookies={setGeoCookies}
							onLocationChange={onLocationChange} />
						<Header
							weather={weather}
							preferences={preferences}
							onGenderChange={onGenderChange}
							onDateChange={onDateChange}
							onLocationChange={onLocationChange}
							date={targetDate}
							label={headerLabel}
							onGeoLocationRequest={onGeoLocationRequest} />
						<Filters />
						<Main
							data={outfits}
							outfitsLoader={outfitsLoader}
							loading={loading}
							singleResult={singleResult}
							setSingleResult={setSingleResult}
							activeItem={activeItem}
							setActiveItem={setActiveItem}
							reload={reload}
							onLike={onLike}
							onDislike={onDislike}
						/>
					</Route>
				</Switch>
			</div>
		</Router>);
};


export default App;