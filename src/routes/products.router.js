const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/productManager.js");
const productManager = new ProductManager("./src/models/productos.json");

router.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit; 
        let products;

        if (limit) {
            products = await productManager.getProducts();
            products = products.slice(0, parseInt(limit));
        } else {
            products = await productManager.getProducts();
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado o inexistente' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/products', async (req, res) => {
    try {
        const newProduct = req.body;
        const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];

        const missingFields = requiredFields.filter(field => !(field in newProduct));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
        }

        if (typeof newProduct.status === 'undefined') {
            newProduct.status = true;
        }

        const products = await productManager.getProducts();
        const existingProduct = products.find(product => product.code === newProduct.code);

        if (existingProduct) {
            return res.status(400).json({ message: 'El código del producto ya está en uso' });
        }

        const productId = await productManager.addProduct(newProduct);
        res.status(201).json({ id: productId, message: 'Producto agregado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const updatedFields = req.body;

        const allowedFields = ['title', 'description', 'code', 'price', 'stock', 'category', 'thumbnail'];

        const invalidFields = Object.keys(updatedFields).filter(field => !allowedFields.includes(field));

        if (invalidFields.length > 0) {
            return res.status(400).json({ message: `Campos no permitidos para actualización: ${invalidFields.join(', ')}` });
        }

        const isUpdated = await productManager.updateProduct(productId, updatedFields);

        if (isUpdated) {
            res.json({ message: 'Producto actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado o inexistente' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const success = await productManager.deleteProduct(productId);
        
        if (success) {
            res.json({ message: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;