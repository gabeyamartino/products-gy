const express = require('express');
const app = express()
const db = './db/index.js';

app.listen(3000, () => {
  console.log('listening on port 3000')
})