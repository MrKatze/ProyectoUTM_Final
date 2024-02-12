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
exports.disponibilidadporfechaController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class DisponibilidadporfechaController {
    mostrar_disponibilidad_fecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fecha } = req.params;
            const respuesta = yield database_1.default.query('SELECT Fecha, h.TipoHabitacion, TotalHabitacionesDisponibles FROM disponibilidadporfecha JOIN habitaciones AS h ON h.IDHabitacion = IDTipoHabitacion WHERE DATE(Fecha) = ?', [`${fecha}`]);
            res.json(respuesta);
        });
    }
    agregar_disponibilidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO disponibilidadporfecha set ?", [req.body]);
            res.json(resp);
        });
    }
}
exports.disponibilidadporfechaController = new DisponibilidadporfechaController();
