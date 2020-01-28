import React from 'react';

import styles from './header.scss';

const StaticHeader = () => {

	return <>
		<header className={styles.header}>
			<div className={styles['header__filter-line']}>
				<a href="/"
					className={styles['header__logo']}
					alt="StyleHacks"></a>
			</div>
		</header>
	</>
};

export default StaticHeader;
