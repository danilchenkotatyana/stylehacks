import React from 'react';
import Moment from 'react-moment';

import styles from './header.scss';
import weatherStyles from './weather.scss';

import WeatherTemperature from './WeatherTemperature.jsx';
import GenderSelect from './GenderSelect.jsx';
import LocationSelect from './LocationSelect';
import DateSelect from './DateSelect';

const WeatherDate = ({ weather }) => (
	<div className={styles['header__weather-date']}>
		<Moment parse="YYYY-MM-DD" format="ddd MMM. D">{weather.date}</Moment>
	</div>
);

const WeatherIcon = ({ weather }) => <div className={[styles['header__weather-icon'], weatherStyles[weather.icon_class]].join(' ')}/>;

const WeatherAdvice = ({ weather }) => {
	if (weather.advice) {
		return <div className={styles['header__advice']}>{weather.advice}</div>
	}
	return <></>;
};

const WeatherInfo = ({ weather }) => {
	if (!weather) {
		return <></>
	}
	return (
		<div className={styles['header__weather-line']}>
			<div className={styles['header__weather']}>
				<div className={styles['header__weather-values']}>
					<WeatherDate weather={weather}/>
					<WeatherIcon weather={weather}/>
					<WeatherTemperature weather={weather}/>
				</div>

				<div className={styles['header__weather-description']}>{weather.description}</div>
			</div>
			<WeatherAdvice weather={weather}/>
		</div>
	)

};

const Header = ({ label, preferences, weather, date, onGenderChange, onDateChange, onLocationChange }) => {

	return <>
	<header className={styles.header}>
		<div className={styles['header__filter-line']}>
			<a href=""
			   className={styles['header__logo']}
			   alt={label}></a>

			<div className={styles['header__filter-text']}>
				Outfit ideas for a&nbsp;
				<GenderSelect
					preferences={preferences}
					onGenderChange={onGenderChange}/>&nbsp;
				in&nbsp;
				<LocationSelect
					preferences={preferences}
					onLocationChange={onLocationChange}/>&nbsp;
				to wear&nbsp;
				<DateSelect
					onDateChange={onDateChange}
					date={date}/>
			</div>
		</div>
		<WeatherInfo weather={weather}/>
	</header>

	<WeatherInfo weather={weather}/>
	</>
};

export default Header;
