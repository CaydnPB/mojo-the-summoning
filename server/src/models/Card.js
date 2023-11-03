const { db, DataTypes, Model } = require("../db/config");

const Card = db.define("Card", {
    name: DataTypes.STRING,
    mojo: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
});

(async () => {
    await db.sync();
})();

module.exports = { Card };