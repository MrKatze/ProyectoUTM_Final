"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoController = exports.CarritoController = void 0;
const database_1 = __importDefault(require("../database"));
class CarritoController {
    agregar_carrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const datos_carrito = req.body;
                // Insertar reserva
                const insert_carrito = `INSERT INTO carrito_reservaciones (IDCuenta, IDHabitacion, CantidadHabitaciones, FechaEntrada, FechaSalida) VALUES ('${datos_carrito.IDCuenta}', '${datos_carrito.IDHabitacion}', '${datos_carrito.CantidadHabitaciones}', '${datos_carrito.FechaEntrada}', '${datos_carrito.FechaSalida}')`;
                const consulta = yield database_1.default.query(insert_carrito);
                const idReservacion = consulta.insertId;
                res.json({
                    reserva: consulta,
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
    mostrar_reserva_carrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params;
            const respuesta = yield database_1.default.query(`SELECT * FROM CarritoReservaciones WHERE IDCuenta = ?`, [id_usuario]);
            console.log(respuesta);
        });
    }
    actualizar_carrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const resp = yield database_1.default.query("UPDATE CarritoReservaciones set ? WHERE IDCarrito = ?", [req.body, id]);
            res.json(resp);
            console.log(resp);
        });
    }
    eliminar_carrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM CarritoReservaciones WHERE IDCarrito = ?;`, [id]);
            res.json(resp);
        });
    }
}
exports.CarritoController = CarritoController;
exports.carritoController = new CarritoController();
