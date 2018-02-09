const env = process.env.NODE_ENV || 'development'; 

const DATABASE_URL = (
    process.env.DATABASE_URL || 'postgres://localhost/nodesequelizeapp'
); 

const TEST_DATABASE_URL = (
    process.env.TEST_DATABASE_URL ||
    global.TEST_DATABASE_URL ||
    'postgres://localhost/test-node-sequelize-app');

module.exports = {
    PORT: process.env.PORT || 8080, 
    DATABASE_URL: env === 'test' ? TEST_DATABASE_URL : DATABASE_URL,
    // see http://docs.sequelizejs.com/en/latest/api/sequelize/#new-sequelizedatabase-usernamenull-passwordnull-options
    SEQUELIZE_OPTIONS: {logging: env === 'test' ? false : console.log}
};
