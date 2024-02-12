"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuentaController_1 = require("../controllers/cuentaController");
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.put('/actualizar_cuenta/:id', cuentaController_1.cuentaController.actualizar_cuenta);
        this.router.post('/crear_cuenta/', cuentaController_1.cuentaController.crear_cuenta);
        this.router.delete('/eliminar_cuenta/:id', cuentaController_1.cuentaController.eliminar_cuenta);
        this.router.get('/mostrar_cuenta/:id', cuentaController_1.cuentaController.mostrar_cuenta);
        this.router.get('/mostrar_todas_cuentas/', cuentaController_1.cuentaController.mostrar_todas_cuentas);
        this.router.post('/validar_cuenta/', cuentaController_1.cuentaController.validar_cuenta); // validarToken eliminado para pruebas
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
