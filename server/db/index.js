const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})

pool.connect();

const getAllProducts = () => {
  return pool.query('SELECT * FROM product WHERE id < 100000')
}



//`SELECT * FROM product INNER JOIN features ON product.id = features.product_id AND product.id = ${itemId}`
const getProduct = (req, res) => {
  return pool.query(`SELECT * FROM (
    SELECT *, (SELECT json_agg(f) FROM
      (SELECT feature, value FROM features WHERE product_id = product.id) f ) as features
      FROM product WHERE id = ${req.params.product_id}) p`)
      .then((data) => {
        res.send({ data: data.rows[0] });
      })
      .catch((err) => {
        console.log(err)
        res.status(500)
        res.end();
      })
}

const getStyles = (request, response) => {
  var product_id = request.params.product_id;
  var query = `SELECT * FROM styles WHERE product_id = ${product_id}`;
  pool
    .query(query)
    .then(res => {
      var styles = res.rows;
      let photoPromises = [];
      let skuPromises = [];
      styles.forEach((style) => {
        photoPromises.push(pool.query(`SELECT thumbnail_url, url FROM photos WHERE "style_id" = ${style.style_id}`)
          .then(res => res.rows)
        )
        skuPromises.push(pool.query(`SELECT size, quantity FROM skus WHERE "style_id" = ${style.style_id}`)
          .then(res => res.rows))
        })
        Promise.all(photoPromises)
          .then((res) => {
            styles.forEach((style, index) => {
              style.photo = res[index];
            })
            Promise.all(skuPromises)
              .then((res) => {
                styles.forEach((style, index) => {
                  style.skus = res[index];
                })
                response.send(styles);
              })
          })
    })
    .catch(err => {
      console.error('Error executing to get style information', err.stack);
      res.status(500);
    });
}

module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.getStyles = getStyles;

