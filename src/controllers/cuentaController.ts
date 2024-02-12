import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos

class CuentaController{

    public async mostrar_todas_cuentas(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM cuenta');
        res.json( respuesta );
    }
    
    public async mostrar_cuenta(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM cuenta WHERE IDCuenta = ?', [id]);
        console.log(respuesta)
        if(respuesta.length > 0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'Mensaje': 'Cuenta no encontrada.'});
    }

    public async crear_cuenta(req: Request, res: Response): Promise<void> {
        //console.log(req.body)
        const resp = await pool.query("INSERT INTO cuenta set ?",[req.body]);
        res.json(resp);
        //res.json(null);
    }

    public async actualizar_cuenta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const resp = await pool.query("UPDATE cuenta set ? WHERE IDCuenta = ?", [req.body, id]);
        res.json(resp);
        console.log(resp);
    }

    public async eliminar_cuenta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM cuenta WHERE IDCuenta = ?`,[id]);
        res.json(resp);
    }

    public async validar_cuenta(req: Request, res: Response): Promise<void> {
        //console.log(req.body)
        const parametros = req.body;
        var consulta = `SELECT IDCuenta, Rol, NombreCompleto ,CorreoElectronico, NumeroTelefono FROM cuenta WHERE CorreoElectronico = '${parametros.CorreoElectronico}' AND Contrasena = '${parametros.Contrasena}'`;
        const resp = await pool.query(consulta);
        if(resp.length > 0)
            res.json(resp);
        else
            res.json({"IDCuenta":"-1"});
    }
}

export const cuentaController = new CuentaController();