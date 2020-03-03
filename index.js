require('dotenv').config()

const path = require('path');
const parser = require('body-parser');
const nocache = require('nocache');
const secure = require('express-force-ssl');
const expressStaticGzip = require('express-static-gzip');

const app = require('./express');
const logger = require('./logger');
const tracker = require('./middlewares/tracker');
const outfits = require('./business/outfits');
const preferences = require('./business/preferences');

app.set('forceSSLOptions', {
	enable301Redirects: true,
	trustXFPHeader: true,
	httpsPort: 443,
	sslRequiredMessage: 'SSL Required.'
});

const protocheck = process.env.production == 'true' ? (req, res, next) => {
	secure(req, res, next);
} : (req, res, next) => { next() };

app.post('/api/outfits',
	protocheck,
	parser.json(),
	tracker,
	nocache(),
	outfits.list);

app.post('/api/outfits-ml',
	protocheck,
	parser.json(),
	tracker,
	nocache(),
	outfits.listml);

app.get('/api/outfits/:id',
	protocheck,
	tracker,
	nocache(),
	outfits.get);

app.get('/api/outfits/like/:id',
	protocheck,
	tracker,
	nocache(),
	outfits.like);

app.get('/api/outfits/dislike/:id',
	protocheck,
	tracker,
	nocache(),
	outfits.dislike);

app.get('/api/outfits/unlike/:id',
	protocheck,
	tracker,
	nocache(),
	outfits.unlike);

app.get('/api/preferences',
	protocheck,
	tracker,
	nocache(),
	preferences.get);

app.post('/api/preferences',
	protocheck,
	parser.json(),
	tracker,
	nocache(),
	preferences.set);

app.use('/healthy', (req, resp) => {
	resp.sendStatus(200);
});


app.get('/pages/terms-of-service', protocheck, (req, res) => {
	res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.get('/pages/privacy-policy', protocheck, (req, res) => {
	res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.get('/ml', protocheck, (req, res) => {
	res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.use('/',
	protocheck,
	expressStaticGzip(path.join(__dirname, 'client/dist')));

app.listen(process.env.port, function () {
	logger.info('At your service on port', process.env.port);
});