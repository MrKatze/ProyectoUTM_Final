import { Request, Response } from 'express';
import pool from '../database'; //acceso a la base de datos

class ReservacionesController {

    public async rellenar_datos_tabla(req: Request, res: Response): Promise<void> {
        const fechas = req.params;
        console.log(req.body);
        var consulta = `SELECT Cuenta.NombreCompleto, Reservaciones.HoraLlegada, Cuenta.NumeroTelefono, Reservaciones.EstadoReserva 
                            FROM Cuenta JOIN Reservaciones ON Cuenta.IDCuenta = Reservaciones.IDCuenta 
                                WHERE Reservaciones.FechaEntrada = '${fechas.FechaUno}'`;
        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }

    public async mostrar_habitaciones_disponibles_rango_fecha(req: Request, res: Response): Promise<void> {
        const fechas = req.body;
        var consulta = `SELECT DISTINCT h.IDHabitacion, h.TipoHabitacion, h.MaxHuespedes, h.TotalTipoHabitacion, h.Costo
                        FROM habitaciones h
                            JOIN disponibilidadporfecha d ON h.IDHabitacion = d.IDTipoHabitacion
                            WHERE d.Fecha BETWEEN '${fechas.FechaUno}' AND '${fechas.FechaDos}'
                                AND d.TotalHabitacionesDisponibles > 0
                                AND h.IDHabitacion NOT IN (
                                    SELECT r.IDHabitacion
                                        FROM reservaciones re
                                        JOIN detallesreservacion r ON re.IDReserva = r.IDReservacion
                                        WHERE (re.FechaEntrada <= '${fechas.FechaDos}' AND re.FechaSalida >= '${fechas.FechaUno}')
                                            OR (re.FechaEntrada < '${fechas.FechaUno}' AND re.FechaSalida >= '${fechas.FechaUno}')
        )`
        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }

    public async mostrar_habitaciones_disponibles_una_fecha(req: Request, res: Response): Promise<void> {
        const fechas = req.body;
        var consulta = `SELECT h.IDHabitacion, h.TipoHabitacion, h.MaxHuespedes, h.TotalTipoHabitacion, h.Costo
                        FROM habitaciones h
                        JOIN disponibilidadporfecha d ON h.IDHabitacion = d.IDTipoHabitacion
                        WHERE d.Fecha BETWEEN '${fechas.FechaUno}' AND '${fechas.FechaDos}'
                            AND d.TotalHabitacionesDisponibles > 0
                            AND h.IDHabitacion NOT IN (
                                SELECT r.IDHabitacion
                                FROM reservaciones re
                                JOIN detallesreservacion r ON re.IDReserva = r.IDReservacion
                                    WHERE (re.FechaEntrada < '${fechas.FechaUno}' AND re.FechaSalida > '${fechas.FechaDos}'))`

        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }

    public async mostrar_habitaciones_num_disponibilidad(req: Request, res: Response): Promise<void> {
        const fechas = req.body;
        var consulta = `    WITH HabitacionesDisponibles AS (
            SELECT 
                h.IDHabitacion, 
                h.TipoHabitacion, 
                h.MaxHuespedes, 
                h.TotalTipoHabitacion, 
                h.Costo,
                d.Fecha,
                d.TotalHabitacionesDisponibles
            FROM 
                habitaciones h
            JOIN 
                disponibilidadporfecha d ON h.IDHabitacion = d.IDTipoHabitacion
            WHERE 
                d.Fecha BETWEEN '2024-02-10' AND '2024-02-16'
                AND d.TotalHabitacionesDisponibles > 0
        ),
        HabitacionesConDisponibilidadCero AS (
            SELECT 
                h.IDHabitacion
            FROM 
                HabitacionesDisponibles h
            WHERE 
                NOT EXISTS (
                    SELECT 
                        1
                    FROM 
                        disponibilidadporfecha d
                    WHERE 
                        d.IDTipoHabitacion = h.IDHabitacion
                        AND d.Fecha BETWEEN '2024-02-10' AND '2024-02-16'
                        AND d.TotalHabitacionesDisponibles > 0
                )
        )
        SELECT 
            IDHabitacion,
            TipoHabitacion,
            MaxHuespedes,
            TotalTipoHabitacion,
            Costo,
            MinDisponibles
        FROM 
            (
                SELECT 
                    h.IDHabitacion, 
                    h.TipoHabitacion, 
                    h.MaxHuespedes, 
                    h.TotalTipoHabitacion, 
                    h.Costo,
                    0 AS MinDisponibles
                FROM 
                    HabitacionesDisponibles h
                WHERE 
                    h.IDHabitacion NOT IN (SELECT IDHabitacion FROM HabitacionesConDisponibilidadCero)
                UNION
                SELECT 
                    h.IDHabitacion, 
                    h.TipoHabitacion, 
                    h.MaxHuespedes, 
                    h.TotalTipoHabitacion, 
                    h.Costo,
                    MIN(d.TotalHabitacionesDisponibles) AS MinDisponibles
                FROM 
                    HabitacionesDisponibles h
                JOIN 
                    disponibilidadporfecha d ON h.IDHabitacion = d.IDTipoHabitacion
                WHERE 
                    d.Fecha BETWEEN '2024-02-10' AND '2024-02-16'
                GROUP BY 
                    h.IDHabitacion, 
                    h.TipoHabitacion, 
                    h.MaxHuespedes, 
                    h.TotalTipoHabitacion, 
                    h.Costo
                HAVING 
                    MIN(d.TotalHabitacionesDisponibles) > 0
            ) AS Resultado
        WHERE 
            MinDisponibles > 0
        ORDER BY 
            IDHabitacion;`

        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }


    public async mostrar_reservaciones_por_fecha(req: Request, res: Response): Promise<void> {
        const { fecha } = req.params;
        const respuesta = await pool.query('SELECT * FROM reservaciones WHERE FechaEntrada = ?', [fecha]);
        res.json(respuesta);
    }


    public async mostrar_reservaciones_por_rango_fecha(req: Request, res: Response): Promise<void> { // PENDIENTE
        const fechas = req.body;
        var consulta = `SELECT * FROM reservaciones WHERE FechaEntrada >= '${fechas.FechaUno}' AND FechaEntrada <= '${fechas.FechaDos}'`;
        const resp = await pool.query(consulta);
        res.json(resp);
    }

    public async hacer_reservacion(req: Request, res: Response): Promise<void> {
        try {
            const datos_reserva = req.body;

            // Insertar reserva
            const insert_reserva = `INSERT INTO reservaciones (IDCuenta, FechaEntrada, FechaSalida, HoraLlegada) VALUES 
                ('${datos_reserva.IDCuenta}', '${datos_reserva.FechaEntrada}', 
                    '${datos_reserva.FechaSalida}', '${datos_reserva.HoraLlegada}')`;

            const consulta = await pool.query(insert_reserva);
            const idReservacion = consulta.insertId;

            const insert_detallesReser = `INSERT INTO DetallesReservacion(IDReservacion, IDHabitacion, CantidadHabitaciones) 
                VALUES `;
            const consulta2 = await pool.query(insert_detallesReser);
            const update = `UPDATE disponibilidadporfecha SET TotalHabitacionesDisponibles - '${datos_reserva.TotalHabitaciones}' `;

            const consulta3 = await pool.query(update);

            res.json({
                reserva: consulta,
                detallesReserva: consulta2,
                disponibilidadActualizada: consulta3
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }

    public async modificar_reservacion(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const resp = await pool.query("UPDATE reservaciones set ? WHERE IDReserva = ?", [req.body, id]);
        res.json(resp);
    }

    public async cancelar_reservacion(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM reservaciones WHERE IDReserva = ${id}`);
        const resp2 = await pool.query(`DELETE FROM detallesreservacion WHERE IDReservacion = ${id}`);
        res.json(resp);
    }

    public async modificar_estado_reserva(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('UPDATE reservaciones SET ? WHERE IDReserva = ?', [req.body, id])
        console.log(req.body)
        res.json(resp)
    }

    public async modificar_estado_pago(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('UPDATE reservaciones SET ? WHERE IDReserva = ?', [req.body, id])
        console.log(req.body)
        res.json(resp)
    }

    public async hacer_reservacion_2(req: Request, res: Response): Promise<void> {
        try {
            const datos_reserva = req.body;
            console.log(datos_reserva);
            console.log(datos_reserva.detallesReserva);


            // Insertar reserva
            const insert_reserva = `INSERT INTO reservaciones (IDCuenta, FechaEntrada, FechaSalida, HoraLlegada) VALUES (?, ?, ?, ?)`;
            const reservaValues = [datos_reserva.IDCuenta, datos_reserva.FechaEntrada, datos_reserva.FechaSalida, datos_reserva.HoraLlegada];
            const consulta = await pool.query(insert_reserva, reservaValues);
            const idReservacion = consulta.insertId;

            // Insertar detalle reserva
            for (const detalle of datos_reserva.detallesReserva) {
                const insert_detallesReserva = `INSERT INTO DetallesReservacion(IDReservacion, IDHabitacion, CantidadHabitaciones) 
                    VALUES ('${idReservacion}','${detalle.IDHabitacion}','${detalle.CantidadHabitaciones}')`;
                await pool.query(insert_detallesReserva)
            }

            // Actualizar disponibilidad por fecha
            const fechaInicio = datos_reserva.FechaEntrada;
            const fechaFin = datos_reserva.FechaSalida;
            const totalHabitaciones = datos_reserva.detallesReserva.reduce((total: number, detalle: any) => total + detalle.CantidadHabitaciones, 0);
            const update_disponibilidad = `UPDATE disponibilidadporfecha SET TotalHabitacionesDisponibles = TotalHabitacionesDisponibles - ? WHERE Fecha >= ? AND Fecha < ? AND IDTipoHabitacion = ?`;
            for (const detalle of datos_reserva.detallesReserva) {
                const updateValues = [detalle.CantidadHabitaciones, fechaInicio, fechaFin, detalle.IDHabitacion];
                await pool.query(update_disponibilidad, updateValues);
            }

            res.json({
                reserva: consulta,
                mensaje: 'Reserva realizada correctamente'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }

    public async tabla_reservas(req: Request, res: Response): Promise<void> {
        const { fecha } = req.params;
        const respuesta = await pool.query('SELECT r.IDCuenta, r.IDReserva, c.NombreCompleto, r.HoraLlegada, DATE_FORMAT(r.FechaEntrada, \'%d-%m-%Y\') AS FechaEntrada, DATE_FORMAT(r.FechaSalida, \'%d-%m-%Y\') AS FechaSalida, c.NumeroTelefono, r.EstadoReserva, r.EstadoPago FROM  reservaciones r JOIN cuenta c ON r.IDCuenta = c.IDCuenta WHERE ? BETWEEN r.FechaEntrada AND r.FechaSalida AND ? < r.FechaSalida', [fecha, fecha]);
        res.json(respuesta);
    }

    public async reservas_idUsuario(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        const respuesta = await pool.query('SELECT r.IDReserva, r.FechaEntrada, r.FechaSalida, r.HoraLlegada, r.EstadoReserva, r.EstadoPago FROM reservaciones r JOIN cuenta c ON r.IDCuenta = c.IDCuenta WHERE c.IDCuenta = ?;', [id]);
        res.json(respuesta);
    }

}
export const reservacionesController = new ReservacionesController();