const Sequelize = require("sequelize");
const productsModel = require("../models/product.js");
const db = require("../models/index.js");

// Получаю с бд все продукты
exports.all = async function getProducts(cb) {
    //const products = await db.query('SELECT * FROM products');
    const products = await db.findAll({ raw: true });
    if (products === null) {
        return cb(Error, null);
    } else {
        return cb(null, products);
    };
};

// Получаю с бд конкретный продукт
exports.one = async function getOneProduct(id, cb) {
    //const getOneQuery = 'SELECT * FROM product where id = $1';
    //const getDiscount = 'SELECT * FROM discounts where product_id = $1';
    //const curDiscount = await Discount.findOne({where: id});
    const product = await db.findAll({ where: { id: id } });
    const productDiscount = await Discount.findAll({ where: { product_id: id } });
    const priceWithDiscount = product.price - (product.price * ((productDiscount.discount) / 100));
    if (product === null) {
        return cb(Error, null);
    } else if (productDiscount === null) {
        return cb(null, product)
    } else {
        product.price = priceWithDiscount;
        const result = product;
        return cb(null, result);
    };
};
