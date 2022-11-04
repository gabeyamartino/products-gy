const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const db = require('./db/index.js');
const {getAllProducts, getProduct, getStyles} = require('./db/index.js')

//app.use(bodyParser.json())
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {

  //res.json({ info: 'Node.js, Express, and Postgres API' })
})

//ALL PRODUCTS

app.get('/products', (req, res) => {
  console.log('products route setup!')
  getAllProducts()
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    console.log(err)
    res.status(500)
    res.end();
  })
})

//SINGLE PRODUCT

app.get('/products/:product_id', getProduct);

// //PRODUCT STYLES

app.get('/products/:product_id/styles', getStyles)
// (req, res) => {
//   getStyles(req.params.product_id)
//   .then((data) => {
//     console.log(data)
//     res.send(data);
//   })
//   .catch((err) => {
//     console.log(err)
//     res.status(500)
//     res.end();
//   })
// })

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})