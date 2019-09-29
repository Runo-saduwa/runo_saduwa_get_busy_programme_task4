const path = require('path');
const hbs = require('hbs');
const express = require('express');
const chalk = require('chalk');
const app = express();

// ===== DEFINE PATHS FOR VIEWS ===== //
const publicDirectoryPath = path.join(__dirname, './public');
const partialsPath = path.join(__dirname, './views/partials');

// ==== SET UP PARTIALS ==== //
hbs.registerPartials(partialsPath);
hbs.registerHelper('add', function(a, b) {
	return a + b;
});

// === Helpers === //
hbs.registerHelper('minus', function(a, b) {
	return a - b;
});
hbs.registerHelper('if_eq', function(a, b, opts) {
	if (a == b) {
		return opts.inverse(this);
	} else {
		return opts.fn(this);
	}
});

// ===== SET UP FOR HANDLEBARS TEMPLATE ENGINE ==== //
app.set('view engine', 'hbs');

// ==== SET UP TO SERVE STATIC ASSETS FROM PUBLIC FOLDER ==== //
app.use(express.static(publicDirectoryPath));

// ==== require all routes from routes.js ==== //
app.use(require('./app/routes'));

const PORT = 8000;

app.listen(PORT, () => {
	console.log(chalk.inverse.green(`SERVER IS UP AT PORT ${PORT}`));
});
