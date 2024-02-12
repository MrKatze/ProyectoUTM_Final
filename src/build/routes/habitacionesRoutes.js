"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habitacionesController_1 = require("../controllers/habitacionesController");
class HabitacionesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.put('/actualizar_habitacion/:id', habitacionesController_1.habitacionesController.actualizar_habitacion);
        this.router.post('/crear_habitacion/', habitacionesController_1.habitacionesController.crear_habitacion);
        this.router.delete('/eliminar_habitacion/:id', habitacionesController_1.habitacionesController.eliminar_habitacion);
        this.router.get('/mostrar_habitacion/:id', habitacionesController_1.habitacionesController.mostrar_habitacion);
        this.router.get('/mostrar_todas_habitaciones/', habitacionesController_1.habitacionesController.mostrar_todas_habitaciones);
        this.router.get('/total_habitaciones/', habitacionesController_1.habitacionesController.total_habitaciones);
    }
}
const habitacionesRoutes = new HabitacionesRoutes();
exports.default = habitacionesRoutes.router;
