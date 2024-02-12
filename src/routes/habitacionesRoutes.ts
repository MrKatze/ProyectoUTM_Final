import { Router } from 'express';
import { habitacionesController } from '../controllers/habitacionesController';
import { validarToken } from '../middleware/auth';

class HabitacionesRoutes{

    public router: Router = Router();
    constructor(){
        this.config();
    }

    config() : void{
        this.router.put('/actualizar_habitacion/:id', habitacionesController.actualizar_habitacion);
        this.router.post('/crear_habitacion/',  habitacionesController.crear_habitacion);
        this.router.delete('/eliminar_habitacion/:id', habitacionesController.eliminar_habitacion);
        this.router.get('/mostrar_habitacion/:id', habitacionesController.mostrar_habitacion);
        this.router.get('/mostrar_todas_habitaciones/', habitacionesController.mostrar_todas_habitaciones);
        this.router.get('/total_habitaciones/',habitacionesController.total_habitaciones);
    }
}

const habitacionesRoutes = new HabitacionesRoutes();
export default habitacionesRoutes.router;