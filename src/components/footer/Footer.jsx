import React from 'react';
import styles from './footer.scss'


const ADVICE = 'Grab an umbrella and opt for closed shoes!';
const INSTAGRAM = 'https://www.instagram.com/';
const FACEBOOK = 'https://www.facebook.com/groups/1357049621081133/';

const Footer = () => (
	<footer className={styles.footer}>
		<div className={styles['footer__first-line']}>
			<a href={INSTAGRAM}
			   target="_blank"
			   className={styles['footer__instagram']}
			   alt='Instagram'></a>
			<a href={FACEBOOK}
			   target="_blank"
			   className={styles['footer__facebook']}
			   alt='Facebook'></a>
		</div>
		<div className={styles['footer__second-line']}>
			<div className={styles['footer__link']}>About</div>
			<div className={styles['footer__link']}>Contacts</div>
			<div className={styles['footer__link']}>Privicy Policy</div>
			<div className={styles['footer__link']}>Terms of Service</div>
		</div>
	</footer>
);

export default Footer;
