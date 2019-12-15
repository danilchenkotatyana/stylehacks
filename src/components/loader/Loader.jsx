import React from "react";
import styles from './loader.scss';

const Loader = ({active}) => {
	//console.log('loader active', active);
	if (active) {
		return (
			<div className={styles.loader} key="loader"><div>Loading...</div></div>
		)
	}
	return <></>
};
export default Loader;