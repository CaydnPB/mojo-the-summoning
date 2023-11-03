const { db, DataTypes, Model } = require("../db/config");

const User = db.define("User", {
    username: DataTypes.STRING,
});

(async () => {
    await db.sync();
})();

module.exports = { User };