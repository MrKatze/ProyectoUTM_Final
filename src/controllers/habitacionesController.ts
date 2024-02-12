import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos

class HabitacionesController{

    public async mostrar_todas_habitaciones(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM habitaciones');
        res.json( respuesta );
    }
    
    public async mostrar_habitacion(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM habitaciones WHERE IDHabitacion = ?', [id]);
        if(respuesta.length > 0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'Mensaje': 'Habitacion no encontrada.'});
    }

    public async crear_habitacion(req: Request, res: Response): Promise<void> {
        //console.log(req.body)
        const resp = await pool.query("INSERT INTO habitaciones set ?",[req.body]);
        res.json(resp);
        //res.json(null);
    }

    public async actualizar_habitacion(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //console.log(req.params);
        console.log(id);
        const resp = await pool.query("UPDATE habitaciones set ? WHERE IDHabitacion = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
    }

    public async eliminar_habitacion(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM habitaciones WHERE IDHabitacion = ${id}`);
        res.json(resp);
    }

    public async total_habitaciones(req: Request, res: Response): Promise <void>{
        const respuesta = await pool.query('SELECT SUM(TotalTipoHabitacion) AS TotalHabitaciones FROM habitaciones');
        if(respuesta.length > 0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'Mensaje': 'Habitacion no encontrada.'});
    }

}

export const habitacionesController = new HabitacionesController();