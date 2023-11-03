const { db, DataTypes, Model } = require("../db/config");

const Attack = db.define("Attack", {
    title: DataTypes.STRING,
    mojoCost: DataTypes.INTEGER,
    staminaCost: DataTypes.INTEGER,
});

(async () => {
    await db.sync();
})();

module.exports = { Attack };