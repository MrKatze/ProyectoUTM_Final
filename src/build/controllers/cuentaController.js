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
exports.cuentaController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class CuentaController {
    mostrar_todas_cuentas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM cuenta');
            res.json(respuesta);
        });
    }
    mostrar_cuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM cuenta WHERE IDCuenta = ?', [id]);
            console.log(respuesta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'Mensaje': 'Cuenta no encontrada.' });
        });
    }
    crear_cuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            const resp = yield database_1.default.query("INSERT INTO cuenta set ?", [req.body]);
            res.json(resp);
            //res.json(null);
        });
    }
    actualizar_cuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const resp = yield database_1.default.query("UPDATE cuenta set ? WHERE IDCuenta = ?", [req.body, id]);
            res.json(resp);
            console.log(resp);
        });
    }
    eliminar_cuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM cuenta WHERE IDCuenta = ?`, [id]);
            res.json(resp);
        });
    }
    validar_cuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            const parametros = req.body;
            var consulta = `SELECT IDCuenta, Rol, NombreCompleto ,CorreoElectronico, NumeroTelefono FROM cuenta WHERE CorreoElectronico = '${parametros.CorreoElectronico}' AND Contrasena = '${parametros.Contrasena}'`;
            const resp = yield database_1.default.query(consulta);
            if (resp.length > 0)
                res.json(resp);
            else
                res.json({ "IDCuenta": "-1" });
        });
    }
}
exports.cuentaController = new CuentaController();
