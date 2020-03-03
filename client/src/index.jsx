import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from "./app";

ReactGA.initialize('UA-136364242-2', {
	//debug: true
});
ReactGA.pageview('/');
ReactDOM.render(
	<CookiesProvider>
		<App />
	</CookiesProvider>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}
