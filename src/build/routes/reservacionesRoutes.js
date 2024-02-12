"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservacionesController_1 = require("../controllers/reservacionesController");
class ReservacionesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/mostrar_habitaciones_disponibles_una_fecha', reservacionesController_1.reservacionesController.mostrar_habitaciones_disponibles_una_fecha);
        this.router.post('/mostrar_habitaciones_disponibles_rango_fecha', reservacionesController_1.reservacionesController.mostrar_habitaciones_disponibles_rango_fecha);
        this.router.put('/modificar_reservacion/:id', reservacionesController_1.reservacionesController.modificar_reservacion);
        this.router.post('/hacer_reservacion/', reservacionesController_1.reservacionesController.hacer_reservacion);
        this.router.delete('/cancelar_reservacion/:id', reservacionesController_1.reservacionesController.cancelar_reservacion);
        this.router.get('/mostrar_reservaciones_por_fecha/:fecha', reservacionesController_1.reservacionesController.mostrar_reservaciones_por_fecha); // SE HA QUITADO EL TOKEN PARA PRUEBAS
        this.router.post('/mostrar_reservaciones_por_rango_fecha/', reservacionesController_1.reservacionesController.mostrar_reservaciones_por_rango_fecha);
        this.router.put('/modificar_estado_reserva/:id', reservacionesController_1.reservacionesController.modificar_estado_reserva);
        this.router.get('/rellenar_datos_tabla/:fecha', reservacionesController_1.reservacionesController.rellenar_datos_tabla);
        this.router.put('/modificar_estado_pago/:id', reservacionesController_1.reservacionesController.modificar_estado_pago);
        this.router.post('/hacer_reservacion_2/', reservacionesController_1.reservacionesController.hacer_reservacion_2);
        this.router.post('/mostrar_habitaciones_num_disponibilidad', reservacionesController_1.reservacionesController.mostrar_habitaciones_num_disponibilidad);
        this.router.get('/tabla_reservas/:fecha', reservacionesController_1.reservacionesController.tabla_reservas);
        this.router.get('/reservas_idUsuario/:id', reservacionesController_1.reservacionesController.reservas_idUsuario);
    }
}
const reservacionesRoutes = new ReservacionesRoutes();
exports.default = reservacionesRoutes.router;
