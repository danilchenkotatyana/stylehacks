import React from 'react';
import { useCookies, setCookie } from 'react-cookie';

import styles from './header.scss';

const WeatherTemperature = ({ weather }) => {

	const [cookies, setCookie] = useCookies(['t']);

	const disabledStyle = styles['header__weather-scale-disabled'];


	const setScale = (scale) => {
		return (e) => {
			e.preventDefault();
			if (e.target.classList.contains(disabledStyle)) {
				return;
			}
			setCookie('t', scale, {maxAge: 365 * 24 * 3600});
		}
	};
	const celcius = cookies.t === 'c';

	const temperatureMinF = weather.temp_min;
	const temperatureMaxF = weather.temp_max;

	const toCelcius = (f) => Math.ceil((f - 32) * 5 / 9);

	const temperatureMin = celcius ? toCelcius(temperatureMinF) : temperatureMinF;
	const temperatureMax = celcius ? toCelcius(temperatureMaxF) : temperatureMaxF;

	return (
		<div className={styles['header__weather-temperature']}>
			{temperatureMax}&#47;{temperatureMin}&nbsp;&nbsp;
			<span className={!celcius ? disabledStyle : ''} onClick={setScale('f')}>F</span>&#47;
			<span className={celcius ? disabledStyle : ''} onClick={setScale('c')}>C</span>
		</div>
	);
};

export default WeatherTemperature;