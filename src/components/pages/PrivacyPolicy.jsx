import React, { useEffect, useState } from 'react';
import { useCookies, setCookie } from 'react-cookie';

import styles from './pages.scss';

const PrivacyPolicy = () => {
    return (
		<div className={styles["legal-info"]}>
            <h1 className={styles["legal-info__title"]}>PRIVACY POLICY</h1>
            <h2>Data Controller and Owner</h2>
            <p>StyleHacks, Maison Me, by Epytom Inc. 123 Bella Vista ave, Los Gatos 95030 USA, <a className={styles.link} href="mailto:sartan@epytom.com">sartan@epytom.com</a></p>
            <h2>Types of Data collected</h2>
            <p>The owner does not provide a list of Personal Data types collected.
Other Personal Data collected may be described in other sections of this privacy policy or by dedicated explanation text contextually with the Data collection.
The Personal Data may be freely provided by the User, or collected automatically when using this Application.
Any use of Cookies ­ or of other tracking tools ­ by this Application or by the owners of third party services used by this Application, unless stated otherwise, serves to identify Users and remember their preferences, for the sole purpose of providing the service required by the User.
Failure to provide certain Personal Data may make it impossible for this Application to provide its services.
Users are responsible for any Personal Data of third parties obtained, published or shared through this Application and confirm that they have the third party's consent to provide the Data to the Owner.</p>
            <h2>Mode and place of processing the Data</h2>
            <h3>Methods of processing</h3>
            <p>The Data Controller processes the Data of Users in a proper manner and shall take appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data.
The Data processing is carried out using computers and/or IT enabled tools, following organizational procedures and modes strictly related to the purposes indicated. In addition to the Data Controller, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of the site (administration, sales, marketing, legal, system administration) or external parties (such as third party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be requested from the Data Controller at any time.</p>
            <h3>Place</h3>
            <p>The Data is processed at the Data Controller's operating offices and in any other places where the parties involved with the processing are located. For further information, please contact the Data Controller.</p>
            <h3>Retention time</h3>
            <p>The Data is kept for the time necessary to provide the service requested by the User, or stated by the purposes outlined in this document, and the User can always request that the Data Controller suspend or remove the data.</p>
            <h2>The use of the collected Data</h2>
            <p>The Personal Data used for each purpose is outlined in the specific sections of this document.</p>
            <h2>Facebook permissions asked by this Application</h2>
            <p>This Application may ask for some Facebook permissions allowing it to perform actions with the User's Facebook account and to retrieve information, including Personal Data, from it.
For more information about the following permissions, refer to the Facebook permissions documentation and to the <a className={styles.link} href="https://www.facebook.com/about/privacy" target="_blank">Facebook privacy policy.</a>.
The permissions asked are the following:</p>
            <h3>Basic information</h3>
            <p>By default, this includes certain User's Data such as id, name, picture, gender, and their locale. Certain connections of the User, such as the Friends, are also available. If the User has made more of their Data public, more information will be available.</p>
            <h2>Additional information about Data collection and processing</h2>
            <h3>Legal action</h3>
            <p>The User's Personal Data may be used for legal purposes by the Data Controller, in Court or in the stages leading to possible legal action arising from improper use of this Application or the related services.
The User declares to be aware that the Data Controller may be required to reveal personal data upon request of public authorities.</p>
            <h3>Additional information about User's Personal Data</h3>
            <p>In addition to the information contained in this privacy policy, this Application may provide the User with additional and contextual information concerning particular services or the collection and processing of Personal Data upon request.</p>
            <h3>System logs and maintenance</h3>
            <p>For operation and maintenance purposes, this Application and any third party services may collect files that record interaction with this Application (System logs) or use for this purpose other Personal Data (such as IP Address).</p>
            <h3>Information not contained in this policy</h3>
            <p>More details concerning the collection or processing of Personal Data may be requested from the Data Controller at any time. Please see the contact information at the beginning of this document.
</p>
            <h3>The rights of Users</h3>
            <p>Users have the right, at any time, to know whether their Personal Data has been stored and can consult the Data Controller to learn about their contents and origin, to verify their accuracy or to ask for them to be supplemented, cancelled, updated or corrected, or for their transformation into anonymous format or to block any data held in violation of the law, as well as to oppose their treatment for any and all legitimate reasons. Requests should be sent to the Data Controller at the contact information set out above. This Application does not support "Do Not Track" requests.
To determine whether any of the third party services it uses honor the "Do Not Track" requests, please read their privacy policies.</p>
            <h3>Changes to this privacy policy</h3>
            <p>The Data Controller reserves the right to make changes to this privacy policy at any time by giving notice to its Users on this page. It is strongly recommended to check this page often, referring to the date of the last modification listed at the bottom. If a User objects to any of the changes to the Policy, the User must cease using this Application and can request that the Data Controller remove the Personal Data. Unless stated otherwise, the then­current privacy policy applies to all Personal Data the Data Controller has about Users.</p>
            <h3>Information about this privacy policy</h3>
            <p>The Data Controller is responsible for this privacy policy, prepared starting from the modules provided by Epytom and hosted on Epytom's servers.
</p>
        </div>
	);
};
export default PrivacyPolicy;