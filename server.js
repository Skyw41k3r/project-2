const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: 'Llama toes',
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
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });


app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

