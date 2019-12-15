import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import DayPicker from 'react-day-picker';
import ReactGA from 'react-ga';
import moment from 'moment';

import styles from './header.scss';
import datePickerStyles from './DatePicker.scss';

const MAX_FORECAST_AVAILABLE = 5;

const formatDate = (d) => {
	if (!d) {
		return 'Today';
	}
	const m = moment(d, 'YYYY-MM-DD');
	if (m.isSame(moment(), 'days')) {
		return 'Today';
	}
	return m.format('ddd, MMM Do');
}

const DateSelect = ({ date, onDateChange }) => {

	const today = moment();
	const last = moment().add(MAX_FORECAST_AVAILABLE - 1, 'days');
	const fromMonth = moment().toDate();
	const toMonth = moment().add(1, 'month').toDate();

	const [label, setLabel] = useState(formatDate(date));

	const [popupOpen, setPopupOpen] = useState(false);

	const currentDate = date ? moment(date, 'YYYY-MM-DD').toDate() : new Date();

	const onDayClick = (d, modifiers) => {
		const m = moment(d);
		if (modifiers[datePickerStyles.disabled]) {
			ReactGA.event({
				category: 'date',
				action: 'out-of-range'
			});	
			return;
		}
		setPopupOpen(false);
		const value = m.isSame(moment(), 'days') ? '' : m.format('YYYY-MM-DD');
		onDateChange(value);
		setLabel(formatDate(value));
	};

	const onClose = () => {
		setPopupOpen(false);
	};

	const selectStyle = styles['select__title'];
	return (
		<div className={styles['select']}>
			<div className={selectStyle} onClick={() => { setPopupOpen(true) }}>
				{label}
				<div className={styles.arrow} />
			</div>
			<Popup
				position={["top center", "bottom right", "bottom left"]}
				open={popupOpen}
				on="click"
				onClose={onClose}
				closeOnDocumentClick
				mouseLeaveDelay={300}
				mouseEnterDelay={0}
				contentStyle={{ padding: "0px", border: "none" }}
				arrow={false}
				modal={false}
			>
					<DayPicker
						selectedDays={[currentDate]}
						onDayClick={onDayClick}
						className={styles['select__calendar']}
						classNames={datePickerStyles}
						showOutsideDays
						disabledDays={[{ before: today.toDate(), after: last.toDate() }]}
						onDayClick={onDayClick}
						fromMonth={fromMonth}
						toMonth={toMonth}
					/>
			</Popup>
		</div>);
};

export default DateSelect;
