const sequelize = require('../config/connection');
const  { User, jokes }  = require('../models');


const userData = require('./userData.json');
const jokeData = require('./jokeData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

   const joke = await jokes.bulkCreate(jokeData,{
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();