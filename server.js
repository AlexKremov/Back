const express = require("express");
const app = express();
const port = 3001;
const cors = require('cors')

let jsonData = require('./products.json');

app.use(cors());

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

app.get('/products', (req, res) => {
  res.json(jsonData)
})

app.get('/products/:id', (req, res) => {
  let product = jsonData.find(item => item.id == req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    res.send("not found")
  }
})


app.put('/products/:id', (req, res) => {
  let product = jsonData.find(item => item.id == req.params.id)
  if (product) {
    Object.assign(product, req.body)
    res.json(product)
    
  } else {
    res.status(404)
    res.send("not found")
  }
  
})

app.delete('/products/:id', (req, res) => {
  let items = jsonData.filter((e) => e.id != req.params.id)
  jsonData = items
 res.json(jsonData)

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
