import { Request, Response } from 'express';
import pool from '../database';

export class CarritoController {

    public async agregar_carrito(req: Request, res: Response): Promise<void> {
        try {
            const datos_carrito = req.body;

            // Insertar reserva
            const insert_carrito = `INSERT INTO carrito_reservaciones (IDCuenta, IDHabitacion, CantidadHabitaciones, FechaEntrada, FechaSalida) VALUES ('${datos_carrito.IDCuenta}', '${datos_carrito.IDHabitacion}', '${datos_carrito.CantidadHabitaciones}', '${datos_carrito.FechaEntrada}', '${datos_carrito.FechaSalida}')`;
            const consulta = await pool.query(insert_carrito);
            const idReservacion = consulta.insertId;

            res.json({
                reserva: consulta,
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }

    public async mostrar_reserva_carrito(req: Request, res: Response): Promise<void> {
        const { id_usuario } = req.params;
        const respuesta = await pool.query(`SELECT * FROM CarritoReservaciones WHERE IDCuenta = ?`, [id_usuario]);
        console.log(respuesta)

    }

    public async actualizar_carrito(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const resp = await pool.query("UPDATE CarritoReservaciones set ? WHERE IDCarrito = ?", [req.body, id]);
        res.json(resp);
        console.log(resp);
    }

    public async eliminar_carrito(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM CarritoReservaciones WHERE IDCarrito = ?;`,[id]);
        res.json(resp);
    }



}

export const carritoController = new CarritoController();