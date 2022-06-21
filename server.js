const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
var exphbs  = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Daddy jokes',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 15 * 60 * 1000,
        expiration: 24 * 60 * 60 * 1000
    })
};


const app = express();
const PORT = process.env.PORT || 3200;

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
