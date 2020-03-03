import React from 'react';
import styles from './footer.scss'
import { Link } from "react-router-dom";


const INSTAGRAM = 'https://www.instagram.com/talktostylehacks/';
const FACEBOOK = 'https://www.facebook.com/talktostylehacks/';
const GOOGLE = 'https://assistant.google.com/services/a/uid/000000808a1a596c?hl=en-US';

const Footer = () => (
	<footer className={styles.footer}>
		<div className={styles['footer__first-line']}>
			<a href={INSTAGRAM}
				target="_blank"
				className={styles['footer__instagram']}
				alt='Instagram'
				rel="noopener">Instagram</a>
			<a href={FACEBOOK}
				target="_blank"
				className={styles['footer__facebook']}
				alt='Facebook'
				rel="noopener">Facebook</a>
			<a href={GOOGLE}
				target="_blank"
				className={styles['footer__google']}
				alt='Google'
				rel="noopener">Google</a>
		</div>
		<div className={styles['footer__second-line']}>
			{/* <div className={styles['footer__link']}>About</div> */}
			<a href="mailto:sartan@epytom.com" className={styles['footer__link']}>Contacts</a>
			<Link to="/pages/privacy-policy" className={styles['footer__link']}>Privacy Policy</Link>
			<Link to="/pages/terms-of-service" className={styles['footer__link']}>Terms of Service</Link>
		</div>
	</footer>
);

export default Footer;
