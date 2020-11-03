const db = require('./dataBase');

module.exports = async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
};
