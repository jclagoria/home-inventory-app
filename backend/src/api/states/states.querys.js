const dbConnection = require('../../dataBase');

const tableNames = require('../../constant/tableNames');

module.exports = {
    find() {
        return dbConnection(tableNames.state);
    }
};
