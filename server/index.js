const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const db = require('./db/index.js');
const {getAllProducts, getProduct, getStyles, getRelated} = require('./db/index.js')

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

app.get('/products', getAllProducts);


//SINGLE PRODUCT

app.get('/products/:product_id', getProduct);

//PRODUCT STYLES

app.get('/products/:product_id/styles', getStyles)

//RELATED STYLES
app.get('/products/:product_id/related', getRelated)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})