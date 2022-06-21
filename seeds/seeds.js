const sequelize = require('../config/connection');
const  User  = require('../models/User');
const jokes = require('../models/jokes');

const userData = require('./userData.json');
const jokesData = require('./jokes.json')


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await jokes.bulkCreate(jokesData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();