import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { animateScroll } from 'react-scroll';

import styles from './detailsCard.scss';
import Loader from '../../components/loader/Loader.jsx';
import Card from './Card.jsx';

const Details = ({ data,
	activeItem,
	onClose,
	onLike,
	onDislike,
	onUnlike,
	loading,
	outfitsLoader,
	singleResult,
	onProductTypeSelected }) => {
	let visibleSuggestionId = activeItem.id;

	const onVisible = (outfitId, suggestionId) => {
		visibleSuggestionId = suggestionId;
		ReactGA.pageview('/' + outfitId);
		ReactGA.event({
			category: 'outfit',
			action: 'view',
			value: outfitId
		});
		history.replaceState('',
			document.title,
			window.location.pathname + window.location.search + '#' + outfitId);
	}

	useEffect(() => {
		onVisible(activeItem.outfit.id, activeItem.id);
		animateScroll.scrollToTop({
			delay: 0,
			duration: 0
		});
	}, []);

	const close = () => {
		history.replaceState('', document.title, window.location.pathname + window.location.search);
		onClose(visibleSuggestionId);
	};

	const index = data.findIndex((item) => item.id == activeItem.id);
	const dataPart = data.slice(index);

	return (
		<div className={styles['details']}>
			<div className={styles['close-icon']} onClick={close}></div>
			<div className={styles['card-container']}>
				{dataPart.map((item, key) => <Card
					item={item}
					onVisible={onVisible}
					onLike={onLike}
					onDislike={onDislike}
					onUnlike={onUnlike}
					onProductTypeSelected={onProductTypeSelected}
				/>)}
			</div>
			{!singleResult && <Loader
				active={loading}
				outfitsLoader={outfitsLoader} />}
		</div>
	);
};

export default Details;
