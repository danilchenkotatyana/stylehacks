import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import styles from './gallery.scss';
// Components
import Loader from '../../components/loader/Loader.jsx';
import DetailsCard from '../../components/detailsCard/DetailsCard.jsx';
import Rating from '../../components/rating/Rating.jsx';


const breakpointColumnsObj = {
	default: 5,
	1100: 4,
	700: 3,
	500: 2
};

const Gallery = ({ data,
	outfitsLoader,
	loading,
	singleResult,
	setSingleResult,
	activeItem,
	setActiveItem,
	reload,
	onLike,
	onDislike }) => {

	const onClose = (visibleSuggestionId) => {
		setSingleResult(false);
		setActiveItem(null);
		if (singleResult) {
			reload()
		};
		setTimeout(() => {
			const el = document.getElementById('suggestion-' + visibleSuggestionId);
			const header = document.getElementById('header');
			if (el && header) {
				window.scrollTo(0, el.offsetTop + header.offsetHeight);
			}
		}, 200);
	}

	const onClick = async (item) => {
		await setActiveItem(item);
	}

	const items = activeItem ? [] : data.map((item) => (
		<div className={styles.images} id={'suggestion-' + item.id} key={item.id} onClick={() => onClick(item)}>
			<img alt={item.description_style} src={item.outfit.image_url.replace(/.jpg$/, '_w236.jpg')} />
			<Rating item={item} onLike={onLike} onDislike={onDislike} />
			{/* <div className={styles["badge"]}>StyleHacks Favorite</div>
				<div className={styles["badge__rose"]}>Under the coat</div> */}
		</div>
	));

	return (
		<>
			{
				activeItem
					? (
						<DetailsCard
							key="details"
							data={data}
							activeItem={activeItem}
							onClose={onClose}
							onLike={onLike}
							onDislike={onDislike}
							loading={loading}
							singleResult={singleResult}
							outfitsLoader={outfitsLoader} />
					) : (
						<div className={styles.gallery}>
							<Masonry
								key="outfits"
								breakpointCols={breakpointColumnsObj}
								columnClassName={styles["gallery__column"]}
								className={styles["gallery__container"]}
							>
								{items}
							</Masonry>
							<Loader active={loading} outfitsLoader={outfitsLoader} />
						</div>
					)
			}
		</>
	)
};


export default Gallery;
