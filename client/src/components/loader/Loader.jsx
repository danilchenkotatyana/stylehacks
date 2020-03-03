import React from 'react';
import styles from './loader.scss';

const Loader = ({ active, outfitsLoader }) => {
	if (active) {
		return (
			<div className={styles.loader}><div>Loading...</div></div>
		)
	} else {
		return (<div
			className={styles.button}
			onClick={outfitsLoader}>See More Outfits</div>
		);
	}
};
export default Loader;