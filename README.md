# Testeo

## Listar todos los productos
- Método: `GET`
- URL: `http://localhost:8080/api/products`
- Verifica que la solicitud devuelva una lista de todos los productos.

## Obtener un producto por ID
- Método: `GET`
- URL: `http://localhost:8080/api/products/:id` (Reemplaza `:id` con un ID existente)
- Verifica que la solicitud devuelva el producto con el ID especificado.

## Agregar un nuevo producto
- Método: `POST`
- URL: `http://localhost:8080/api/products`
- Cuerpo de la solicitud (en formato JSON) con todos los campos requeridos.
- Verifica que la solicitud devuelva un mensaje indicando que el producto se agregó correctamente.
- Consideraciones de seguridad: No permite crear productos repetidos por código.

## Actualizar un producto por ID
- Método: `PUT`
- URL: `http://localhost:8080/api/products/:id` (Reemplaza `:id` con un ID existente)
- Cuerpo de la solicitud (en formato JSON) con los campos que deseas actualizar.
- Verifica que la solicitud actualice el producto con el ID especificado.

## Eliminar un producto por ID
- Método: `DELETE`
- URL: `http://localhost:8080/api/products/:id` (Reemplaza `:id` con un ID existente)
- Verifica que la solicitud elimine el producto con el ID especificado.

## Crear un nuevo carrito
- Método: `POST`
- URL: `http://localhost:8080/api/carts`
- Verifica que la solicitud cree un nuevo carrito.

## Listar productos en un carrito por ID de carrito
- Método: `GET`
- URL: `http://localhost:8080/api/carts/:cid` (Reemplaza `:cid` con un ID de carrito existente)
- Verifica que la solicitud devuelva los productos en el carrito con el ID de carrito especificado.

## Agregar un producto a un carrito
- Método: `POST`
- URL: `http://localhost:8080/api/carts/:cid/product/:pid` (Reemplaza `:cid` con un ID de carrito y `:pid` con un ID de producto)
- Verifica que la solicitud agregue el producto al carrito especificado y maneje correctamente la lógica para la cantidad de productos.
- Consideraciones de seguridad: No permite agregar productos inexistentes al carrito.

## Eliminar un carrito por ID
- Método: `DELETE`
- URL: `http://localhost:8080/api/carts/:cid` (Reemplaza `:cid` con un ID de carrito existente)
- Verifica que la solicitud elimine el carrito con el ID especificado.

## Eliminar un producto de un carrito
- Método: `DELETE`
- URL: `http://localhost:8080/api/carts/:cid/product/:pid` (Reemplaza `:cid` con un ID de carrito y `:pid` con un ID de producto)
- Verifica que la solicitud elimine el producto del carrito especificado.
