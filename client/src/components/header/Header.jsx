import React, { useState } from 'react';
import Moment from 'react-moment';

import styles from './header.scss';
import weatherStyles from './weather.scss';

import WeatherTemperature from './WeatherTemperature.jsx';
import GenderSelect from './GenderSelect.jsx';
import LocationSelect from './LocationSelect';
import DateSelect from './DateSelect';
import AgendaSelect from './AgendaSelect';

const WeatherDate = ({ weather }) => (
	<div className={styles['header__weather-date']}>
		<Moment parse="YYYY-MM-DD" format="ddd MMM. D">{weather.date}</Moment>
	</div>
);

const WeatherIcon = ({ weather }) => <div className={[styles['header__weather-icon'], weatherStyles[weather.icon_class]].join(' ')} />;

const WeatherAdvice = ({ weather }) => {
	if (weather && weather.advice) {
		return <div className={styles['header__advice']}>{weather.advice}</div>
	}
	return <></>;
};

const WeatherInfo = ({ label, weather }) => {
	if (!weather) {
		return <></>
	}
	return (
		<>
			<div className={styles['header__weather']}>
				<div className={styles['header__weather-values']}>
					<WeatherDate weather={weather} />
					<WeatherIcon weather={weather} />
					<WeatherTemperature weather={weather} />
				</div>

				<div className={styles['header__weather-description']}>{weather.description}</div>
			</div>
			<div className={styles['header__personal']}>
				<div className={styles['header__heart-icon']}></div>
				<div className={styles['header__accont-icon disabled']}></div>
				<div className={styles['header__cart-icon disabled']}></div>
			</div>
		</>
	)

};

const Header = ({ 
	preferences,
	agenda, 
	weather, 
	date, 
	onGenderChange, 
	onAgendaChange, 
	onDateChange, 
	onLocationChange, 
	onGeoLocationRequest, 
	label }) => {

	const [datePopupOpen, setDatePopupOpen] = useState(false);
	const [locationPopupOpen, setLocationPopupOpen] = useState(false);


	const onLocationPopupOpen = () => {
		setLocationPopupOpen(true);
		if (datePopupOpen) {
			setDatePopupOpen(false);
		}
	};


	const onDatePopupOpen = () => {
		setDatePopupOpen(true);
		if (locationPopupOpen) {
			setLocationPopupOpen(false);
		}
	};

	return (<>
	<div id="header" className={styles.head}>
		<header className={styles.header}>
			<div className={styles['header__weather-line']}>
				<a href="/"
					className={styles['header__logo']}
					alt={label}
					title={label}>{label}</a>
				<WeatherInfo weather={weather} />
			</div>
			<div className={styles['header__filter-line']}>

				<div className={styles['header__filter-text']}>
					<AgendaSelect
						agenda={agenda}
						onChange={onAgendaChange} />&nbsp;outfit ideas for a&nbsp;
					<GenderSelect
						preferences={preferences}
						onGenderChange={onGenderChange} />&nbsp;in&nbsp;
					<LocationSelect
						preferences={preferences}
						onLocationChange={onLocationChange}
						onGeoLocationRequest={onGeoLocationRequest}
						onLocationPopupOpen={onLocationPopupOpen}
						popupOpen={locationPopupOpen}
						setPopupOpen={setLocationPopupOpen} />&nbsp;to wear&nbsp;
					<DateSelect
						onDateChange={onDateChange}
						date={date}
						onDatePopupOpen={onDatePopupOpen}
						popupOpen={datePopupOpen}
						setPopupOpen={setDatePopupOpen} />
				</div>
			</div>
		</header>
	</div>
			<WeatherAdvice weather={weather}/>
			</>);
};

export default Header;
