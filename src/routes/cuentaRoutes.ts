import { Router } from 'express';
import { cuentaController } from '../controllers/cuentaController';
import { validarToken } from '../middleware/auth';

class RolesRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config() : void{
        this.router.put('/actualizar_cuenta/:id', cuentaController.actualizar_cuenta);
        this.router.post('/crear_cuenta/', cuentaController.crear_cuenta);
        this.router.delete('/eliminar_cuenta/:id', cuentaController.eliminar_cuenta);
        this.router.get('/mostrar_cuenta/:id', cuentaController.mostrar_cuenta);
        this.router.get('/mostrar_todas_cuentas/', cuentaController.mostrar_todas_cuentas);
        this.router.post('/validar_cuenta/', cuentaController.validar_cuenta); // validarToken eliminado para pruebas
    }
}

const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;