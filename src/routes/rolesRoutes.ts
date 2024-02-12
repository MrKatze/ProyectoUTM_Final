import { Router } from 'express';
import { rolesController } from '../controllers/rolesController';
import { validarToken } from '../middleware/auth';

class RolesRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }

    config() : void{
        //this.router.get('/mostrarTodosRoles/',(req,res) => res.send('probando Roles'));
        this.router.get('/mostrarTodosRoles/', rolesController.mostrar_todos_roles);
        this.router.get('/obtenerRol/:id', rolesController.listOne);
        this.router.post('/crearRol/', rolesController.createRol);
        this.router.put('/actualizarRol/:id', rolesController.actualizarRol);
        this.router.delete('/eliminarRol/:id', rolesController.eliminarRol);
    }
}

const rolesRoutes= new RolesRoutes();
export default rolesRoutes.router;