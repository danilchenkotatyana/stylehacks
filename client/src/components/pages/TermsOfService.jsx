import React, { useEffect, useState } from 'react';
import { useCookies, setCookie } from 'react-cookie';

import styles from './pages.scss';

const TermsOfService = () => {
    return (
		<div className={styles["legal-info"]}>
            <h1 className={styles["legal-info__title"]}>TERMS OF SERVICE</h1>
            <h2>Welcome to StyleHacks, Epytom Inc.!</h2>
            <p>Epytom operates the Epytom service, which we hope You (the "User", "You", or "Your") use. If You use it, please use it responsibly. If You don't, we'll have to terminate Your account.</p>
            <p>You own the business and personal data that you provide to Epytom and You're responsible for keeping it safe. The Terms of Service (the "Terms"), and the Epytom Service (or "Services" as defined herein) can change at any time. We'll try to warn you about major changes to the Terms or Epytom, but we make no guarantees. Epytom services is for your personal, non­commercial use. That's the basic idea, but you must read through the entire below and agree with all the details before you use any of our sites (whether or not You have created an account).</p>
            <h3>Reuse</h3>
            <p>This document is an adaptation of the <a className={styles.link} href="http://legal.heroku.com/tos" target="_blank">Heroku Terms of Service</a>, which is turn an adaptation of the <a className={styles.link} href="http://code.google.com/appengine/terms.html" target="_blank">Google App Engine Terms of Service</a>. The original work has been modified with permission under the <a className={styles.link} href="http://creativecommons.org/licenses/by/3.0" target="_blank">Creative Commons Attribution 3.0 License</a>. Neither Heroku, Inc. nor Google, Inc. is connected with and they do not sponsor or endorse Epytom or its use of the work.</p>
            <p>You're welcome to adapt and use this document for Your own needs. If you make an improvement, we'd appreciate it if You would let us know so we can consider improving our own document.
</p>
            <h3>Your Agreement with Epytom</h3>
            <p>Your use of the Epytom Service is governed by these Terms. The "Service" means the services Epytom makes available include our web sites, our mobile applications, blog, our API, and any other software, sites, and services offered by Epytom in connection to any of those.</p>
            <p>In order to use the Service, You must first agree to the Terms. You understand and agree that Epytom will treat Your use of the Service as acceptance of the Terms from that point onwards.</p>
            <p>Epytom may make changes to the Terms from time to time. You may reject the changes by terminating Your account. You understand and agree that if You use the Service after the date on which the Terms have changed, Epytom will treat Your use as acceptance of the updated Terms.</p>
            <p>If you have any question about the Terms, please contact us at <a className={styles.link} href="mailto:sartan@epytom.com">sartan@epytom.com</a></p>
            <h3>Your Account</h3>
            <p>— You may not use the Service if You are a person barred from receiving the Service under the laws of the United States or other countries, including the country in which You are resident or from which You use the Service.<br/>
            — You may not use the service unless you are over the age of 13.<br/>
            — You must be a human. Account created by automated methods are not permitted.</p>
            <h3>Use of the Service</h3>
            <p>— You must provide accurate and complete registration information any time You register to use the Service. Don't impersonate anyone else or choose names that are offensive or that violate anyone's rights. — You are responsible for the security of Your passwords and for any use of Your account.<br/>
— Your use of the Service must comply with all applicable laws, regulations and ordinances.<br/>
— You agree to not engage in any activity that interferes with or disrupts the Service.<br/>
— Epytom reserves the right to enforce quotas and usage limits (to any resources, including the API) at its sole discretion, with or without notice, which may result in Epytom disabling or throttling Your usage of the Service for any amount of time.<br/>
— You may not allow multiple people to use the same account or otherwise access the Service in a manner intended to avoid personalisation of a User.</p>
            <h3>Service Policies and Privacy</h3>
            <p>The Service shall be subject to the privacy policy for the Service, which are hereby expressly incorporated into the Terms of Service. You agree to the use of Your data in accordance with Epytom' Privacy Policy as described below.</p>
            <p>In order for you to create an account on Epytom and use our services, we need to collect and process some information. Depending on your use of the Epytom Services, that may include:</p>
            <p>— information (such as your name, email and postal addresses, telephone number, and country of residence) that you provide by completing forms on Epytom, including if you register as a user of the Services, subscribe to our newsletters, upload or submit any material through Epytom, or request any information;<br/>
— your login and password details, in connection with the account sign­in process;<br/>
— details of any requests or transactions you make through the Services;<br/>
— information about your activity on and interaction with Epytom, such as your IP address and the type of device or browser you use;<br/>
— communications you send to us (for example, when you ask for support, send us questions or comments, or report a problem);<br/>
— information that you submit to Epytom in the form of comments, contributions to discussions, or messages to other users.</p>
            <p>This data will not be publicly displayed or revealed to other users:<br/>
— your password details;<br/>
— your IP address;<br/>
— your phone number;<br/>
— direct email communications you send to us (for example, when you ask for support, send us questions or comments, or report a problem).
</p>
            <p>In addition to information about yourself, it may be possible for you to submit other content ("Content"), such as photos and other media, each of which you present through technology available through the Services. It is entirely up to you whether you want to submit this additional information, and whether you would like to make it available to others – although information you share on the forum will automatically be shared with others, including users of the Services and others on the internet. However, Epytom has no responsibility for how many people you allow to view your Content (or the public if you make any information available to the public or post on the Forum) use that material, or to whom they may forward it.</p>
            <p>Finally, we may use information that you include in emails or other communication methods to us to assist us in providing the Service, and we may publish that information on an anonymous basis. In addition, the text of any posting on any one of the discussions, polls, bulletin boards, or other similar publically accessible systems offered by Epytom (including any market place or wish list) becomes the property of Epytom, and may be republished to other people through the internet.
In each case, we will collect and record the information you have provided.</p>
            <p>We don't give your personal information to any third­party services, except when it's necessary to provide Epytom's Services. When we share data with third­party services that support our delivery of the Epytom Services, we require that they protect your personal information to the same standards we do. However, we may share your personal information with third parties in an aggregate and anonymous format combined with the information we collect from other users.
</p>
            <p>We do reserve the right to disclose personal information when we believe that doing so is reasonably necessary to comply with the law or law enforcement, to prevent fraud or abuse, or to protect Epytom's legal rights, or if You are a party of any payment through Open Epytom Account of our client of Epytom.</p>
            <h3>Our Fee</h3>
            <p>We will not collect any fees without giving you a chance to review and accept them. If our fees ever change, we'll announce that on our web site.
You're responsible for paying any additional fees or taxes associated with your use of Epytom.
</p>
            <h3>Cancellation and Termination</h3>
            <p>— You may cancel Your account via Epytom web site or mobile application. An email or phone request to cancel Your account is not considered cancellation.<br/>
— You agree that Epytom, in its sole discretion and for any or no reason, may terminate or suspend Your account. You agree that any termination of Your access to the Service may be without prior notice, and You agree that Epytom will not be liable to You or any third party for such termination.</p>
            <h3>Ideas and Feedback</h3>
            <p>You may choose to or we may invite You to submit comments or ideas about the Service, including but not limited to ideas about improving the Service or our products ("Ideas"). By submitting any Idea, You agree that Your disclosure is unsolicited and without restriction and will not place Epytom under any fiduciary or other obligation, and that we are free to use the Idea without any additional compensation to You, and/or to disclose the Idea on a non­confidential basis or otherwise to anyone.
</p>
            <h3>Modification of the Service</h3>
            <p>— You acknowledge and agree that the Service may change from time to time without prior notice to You.<br/>
— Changes include, without limitation, changes to fee and payment policies, security patches, added or removed functionality, and other enhancements or restrictions.<br/>
— Epytom shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.</p>
            <h3>External Resources</h3>
            <p>The Service may include hyperlinks to other web sites or content or resources or email content. You acknowledge and agree that Epytom is not responsible for the availability of any such external sites or resources, and does not endorse any advertising, products or other materials on or available from such web sites or resources.</p>
            <h3>Disclaimer of Warranties</h3>
            <p>If you access the service, you do so at your own risk. We provide the service "as is", "with all faults" and "as available." We make no express or implied warranties or guarantees about the service. To the maximum extent permitted by law, we hereby disclaim all such warranties, including all statutory warranties, with respect to the service, including without limitation any warranties that the service is merchantable, of satisfactory quality, accurate, fit for a particular purpose or need, or non­infringing. We do not guarantee that the results that may be obtained from the use of the service will be effective, reliable or accurate or will meet your requirements. We do not guarantee that you will be able to access or use the service (either directly or through third­party networks) at times or locations of your choosing. We are not responsible for the accuracy, reliability, timeliness or completeness of information provided by any other users of the service or any other data or information provided or received through the service. Except as expressly set forth herein, epytom makes no warranties about the information systems, software and functions made accessible by or through the service or any security associated with the transmission of sensitive information. Epytom does not warrant that the service will operate error­free, that errors in the service will be fixed, that loss of data will not occur, or that the service or software are free of computer viruses, contaminants or other harmful items. Under no circumstances will epytom, any of our affiliates, distributors, partners, licensors, and/or any of our or their directors, officers, employees, consultants, agents, or other representatives be liable for any loss or damage caused by your reliance on information obtained through the service.</p>
            <h3>Limitations on Liability</h3>
            <p>Your sole and exclusive remedy for any dispute with us is the cancellation of your registration. In no event shall our total cumulative liability to you for any and all claims relating to or arising out of your use of the service, regardless of the form of action, exceed the greater of: (a) the total amount of fees, if any, that you paid to utilize the service or (b) one hundred dollars ($100). In no event shall we be liable to you (or to any third party claiming under or through you) for any direct, indirect, special, incidental, consequential, punitive or exemplary damages or any bodily injury, emotional distress, death or any other damages arising from your use of or inability to use the service, whether on­line or off­line, or otherwise in connection with the service. These exclusions apply to any claims for lost profits, lost data, loss of goodwill or business reputation, cost of procurement of substitute goods or services, work stoppage, computer failure or malfunction, any other commercial damages or losses, or any personal injury or property damages, even if we knew or should have known of the possibility of such damages. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the extent permitted by law. If you are a california resident, you waive your rights with respect to california civil code section 1542, which says "a general release does not extend to claims which the creditor does not know or suspect to exist in his favor at the time of executing the release, which, if known by him must have materially affected his settlement with the debtor."</p>
            <h3>Indemnification</h3>
            <p>You agree to hold harmless and indemnify Epytom, and its subsidiaries, affiliates, officers, agents, employees, advertisers, licensors, suppliers or partners from and against any third party claim arising from or in any way related to (a) Your breach of the Terms, (b) Your use of the Service, or (c) Your violation of applicable laws, rules or regulations in connection with the Service, including any liability or expense arising from all claims, losses, damages (actual and consequential), suits, judgments, litigation costs and attorneys' fees, of every kind and nature. In such a case, Epytom will provide You with written notice of such claim, suit or action.</p>
            <h3>Choice of Law and Dispute Resolution</h3>
            <p>The Terms of Service shall be deemed to have been entered into and shall be construed and enforced in accordance with the laws of the State of California as applied to contracts made and performed entirely within California, without giving effect to any conflicts of law statutes. Any controversy, dispute or claim arising out of or related to the Terms, the Privacy Policy or the Service shall be settled by final and binding arbitration to be conducted by an arbitration tribunal in the State of California and the County of San Mateo, pursuant to the rules of the American Arbitration Association. Any and all disputes that You may have with Epytom shall be resolved individually, without resort to any form of class action.</p>
            <h3>General Legal Terms</h3>
            <p>The Terms, including the Privacy Policy, constitute the whole legal agreement between You and Epytom and govern Your use of the Service and completely replace any prior agreements between You and Epytom in relation to the Service.
If any part of the Terms is held invalid or unenforceable, that portion shall be construed in a manner consistent with applicable law to reflect, as nearly as possible, the original intentions of the parties, and the remaining portions shall remain in full force and effect.</p>
            
            <p>The failure of Epytom to exercise or enforce any right or provision of the Terms shall not constitute a waiver of such right or provision. The failure of either party to exercise in any respect any right provided for herein shall not be deemed a waiver of any further rights hereunder.</p>
            <p>You agree that if Epytom does not exercise or enforce any legal right or remedy which is contained in the Terms (or which Epytom has the benefit of under any applicable law), this will not be taken to be a formal waiver of Epytom's rights and that those rights or remedies will still be available to Epytom.</p>
            <p>Epytom shall not be liable for failing or delaying performance of its obligations resulting from any condition beyond its reasonable control, including but not limited to, governmental action, acts of terrorism, earthquake, fire, flood or other acts of God, labor conditions, power failures, and Internet disturbances.</p>
            <p>We may assign this contract at any time to any parent, subsidiary, or any affiliated company, or as part of the sale to, merger with, or other transfer of our company to another entity.</p>
        </div>
	);
};
export default TermsOfService;