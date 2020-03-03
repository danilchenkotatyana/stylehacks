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
import { YES, NO, UNDEFINED } from './components/rating/Rating.jsx';

import { getOutfits, getOutfit, getPreferences, setPreferences, like, dislike, unlike } from './api/api.jsx';
import arrayEquals from './utils/arrayEquals.jsx';

const headerLabel = 'StyleHacks';

let useMl = false;

const App = () => {
	const [preferences, setPrefs] = useState({});
	const [outfits, setOutfits] = useState([]);
	const [weather, setWeather] = useState(null);
	const [targetDate, setTargetDate] = useState('');
	const [loading, setLoading] = useState(true);
	const [singleResult, setSingleResult] = useState(false);
	const [geoCookies, setGeoCookies] = useCookies(['geo']);
	const [agenda, setAgenda] = useState('casual');
	const [prefsVersion, setPrefsVersion] = useState(0);
	const [ages, setAges] = useState([]);
	const [bodyTypes, setBodyTypes] = useState([]);
	const [hairs, setHairs] = useState([]);
	const [productTypes, setProductTypes] = useState([]);
	const [productTypesOptions, setProductTypesOptions] = useState([]);
	const [geo, setGeo] = useState(false);
	
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

		const chunk = await getOutfits({
			agenda,
			date: targetDate,
			age_group: ages,
			body_type: bodyTypes,
			hair: hairs,
			product_type_id: productTypes
		}, useMl);
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
	}, []);

	useEffect(() => {
		if (window.location.pathname) {
			useMl = '/ml' === window.location.pathname;
		}
		const id = window.location.hash && window.location.hash.length ?
			parseInt(window.location.hash.substring(1), 10) :
			NaN;
		if (!isNaN(id)) {
			setSingleResult(true);
			fetchOutfit(id);
		} else {
			fetchPage(true);
		}
	}, [targetDate, agenda, prefsVersion, ages, bodyTypes, hairs, productTypes]);

	const onGeoLocationRequest = () => {
		setGeoCookies('geo', '');
		setGeo(false);
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
				setPrefsVersion(prefsVersion + 1);
				setAges([]);
				setBodyTypes([]);
				setHairs([]);
				setProductTypes([]);
				setProductTypesOptions([]);
			}
		}
	};
	const onAgendaChange = (option) => {
		if (option.value !== agenda) {
			resetSingleResult();
			setAgenda(option.value);
		}
	};

	const onDateChange = async (date) => {
		if (date !== targetDate) {
			resetSingleResult();
			setTargetDate(date);
		}
	};
	const onLocationChange = async (option) => {
		if (preferences.lat != option.value.coordinates[0] ||
			preferences.lon != option.value.coordinates[1]) {
			resetSingleResult();
			preferences.location = option.value;
			const v = await setPreferences(preferences);
			setPrefs(v);
			setPrefsVersion(prefsVersion + 1);
		}
	};

	const outfitsLoader = async () => {
		console.log('loading page');
		await fetchPage(false);
	}

	const onLike = async (suggestion) => {
		suggestion.liked = YES;
		await like(suggestion.outfit.id);
	}

	const onDislike = async (suggestion) => {
		suggestion.liked = NO;
		await dislike(suggestion.outfit.id);
	}

	const onUnlike = async (suggestion) => {
		suggestion.liked = UNDEFINED;
		await unlike(suggestion.outfit.id);
	}

	const onAgesChange = async (values) => {
		if (!arrayEquals(ages, values)) {
			setAges(values);
		}
	}

	const onBodyTypesChange = async (values) => {
		if (!arrayEquals(bodyTypes, values)) {
			setBodyTypes(values);
		}

	}

	const onHairsChange = async (values) => {
		if (!arrayEquals(hairs, values)) {
			setHairs(values);
		}
	}
	const onProductTypesChange = async (values, options) => {
		if (!arrayEquals(productTypes, values)) {
			setProductTypes(values);
			setProductTypesOptions(options);
		}
	}
	const onProductTypeSelected = async (product) => {
		if (!productTypes.some((v) => v.id == product.id)) {
			resetSingleResult();
			const newtypes = [...productTypes, product.id];
			setProductTypes(newtypes);
			const newoptions = [...productTypesOptions, { label: product.name, value: product.id }];
			setProductTypesOptions(newoptions);
		}
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
					<Route path="/(ml/)?">
						<Geo
							geo={geo}
							setGeo={setGeo}
							cookies={geoCookies}
							setCookies={setGeoCookies}
							onLocationChange={onLocationChange} />
						<Header
							weather={weather}
							preferences={preferences}
							agenda={agenda}
							onGenderChange={onGenderChange}
							onAgendaChange={onAgendaChange}
							onDateChange={onDateChange}
							onLocationChange={onLocationChange}
							date={targetDate}
							label={headerLabel}
							onGeoLocationRequest={onGeoLocationRequest} />
						<Filters
							preferences={preferences}
							ages={ages}
							onAgesChange={onAgesChange}
							bodyTypes={bodyTypes}
							onBodyTypesChange={onBodyTypesChange}
							hairs={hairs}
							onHairsChange={onHairsChange}
							productTypes={productTypes}
							productTypesOptions={productTypesOptions}
							onProductTypesChange={onProductTypesChange} />
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
							onUnlike={onUnlike}
							onProductTypeSelected={onProductTypeSelected}
						/>
					</Route>
				</Switch>
			</div>
		</Router>);
};


export default App;