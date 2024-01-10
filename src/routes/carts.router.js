const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/cartManager.js");
const cartManager = new CartManager("./src/models/carrito.json");

router.post("/carts", async (req, res) => {
    try {
        const cartId = await cartManager.createCart();
        res.status(201).json({ cid: cartId, message: "Carrito creado correctamente" });
    } catch (error) {
        console.error("Error al crear el carrito...", error);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get("/carts/:cid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cartId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el carrito por ID...", error);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.post("/carts/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const success = await cartManager.addProductToCart(cartId, productId);
        if (success) {
            res.json({ message: "Producto agregado al carrito correctamente" });
        } else {
            res.status(404).json({ message: "Carrito o producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al agregar producto al carrito...", error);
        res.status(500).json({ message: "Producto inexistente" });
    }
});

router.delete("/carts/:cid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const success = await cartManager.deleteCart(cartId);
        if (success) {
            res.json({ message: "Carrito eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar el carrito...", error);
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.delete("/carts/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const success = await cartManager.deleteProductFromCart(cartId, productId);
        if (success) {
            res.json({ message: "Producto eliminado del carrito correctamente" });
        } else {
            res.status(404).json({ message: "Carrito o producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar producto del carrito...", error);
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;