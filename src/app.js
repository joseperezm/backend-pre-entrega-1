const express = require('express');
const port = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use("/api", productsRouter);
app.use("/api", cartsRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
}); 