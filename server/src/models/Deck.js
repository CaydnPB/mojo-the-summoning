const { db, DataTypes, Model } = require("../db/config");

const Deck = db.define("Deck", {
    name: DataTypes.STRING,
    xp: DataTypes.INTEGER,
});

(async () => {
    await db.sync();
})();

module.exports = { Deck };