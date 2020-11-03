const db = require('./dataBase');

module.exports = async () => {
    await db.destroy();
};
