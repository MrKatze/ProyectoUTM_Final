"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritoController_1 = require("../controllers/carritoController");
class CarritoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.put('/actualizar_carrito/:id', carritoController_1.carritoController.actualizar_carrito);
        this.router.post('/agregar_cuenta/', carritoController_1.carritoController.agregar_carrito);
        this.router.delete('/eliminar_carrito/:id', carritoController_1.carritoController.eliminar_carrito);
        this.router.get('/mostrar_carrito/:id', carritoController_1.carritoController.mostrar_reserva_carrito);
    }
}
const carritoRoutes = new CarritoRoutes();
exports.default = carritoRoutes.router;
