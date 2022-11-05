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

const getAllProducts = (req, res) => {

  return pool.query('SELECT * FROM product WHERE id < 100000')
}



//`SELECT * FROM product INNER JOIN features ON product.id = features.product_id AND product.id = ${itemId}`
const getProduct = (req, res) => {
  return pool.query(`SELECT * FROM (
    SELECT *, (SELECT json_agg(f) FROM
      (SELECT feature, value FROM features WHERE product_id = product.id) f ) as features
      FROM product WHERE id = ${req.params.product_id}) p`)
      .then((data) => {
        res.status(200).send({ data: data.rows[0] });
      })
      .catch((err) => {
        console.log(err)
        res.status(500)
        res.end();
      })
}

const getStyles = (req, res) => {
  var product_id = req.params.product_id;

  return pool.query(`SELECT json_build_object
  (
      'product_id', ${product_id},
      'results',
    (SELECT json_agg
      (json_build_object
        (
        'style_id', style_id,
        'name', name,
        'original_price', original_price,
        'sale_price', sale_price,
        'default?', "default?",
        'photos',(SELECT json_agg(json_build_object(
              'thumbnail_url', thumbnail_url,
              'url', url)
        ) FROM photos where photos.style_id = styles.style_id),
        'skus',(SELECT json_object_agg(
              id, (
                SELECT json_build_object(
                'quantity', quantity,
                'size', size)
                )
        ) FROM skus WHERE skus.style_id=styles.style_id
             )
        )
      ) FROM styles WHERE product_id = ${product_id}
    )
  )`)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500);
      res.end();
    })
}

const getRelated = (req, res) => {
  return pool.query(`SELECT related_product_id FROM related WHERE current_product_id = ${req.params.product_id}`)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500);
      res.end();
    })
}

module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.getStyles = getStyles;
module.exports.getRelated = getRelated;


