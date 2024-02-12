import { Router } from 'express';
import { disponibilidadporfechaController } from '../controllers/disponibilidadporfechaController';
import { validarToken } from '../middleware/auth';


class DisponibilidadporFechaRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config() : void{
        this.router.get('/mostrar_disponibilidad_fecha/:fecha', disponibilidadporfechaController.mostrar_disponibilidad_fecha);
        this.router.post('/agregar_disponibilidad/', disponibilidadporfechaController.agregar_disponibilidad);
    }
}

const disponibilidadporFechaRoutes = new DisponibilidadporFechaRoutes();
export default disponibilidadporFechaRoutes.router;