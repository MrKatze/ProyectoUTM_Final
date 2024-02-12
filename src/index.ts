import express, {Application} from 'express';
import swagger_ui_express from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import indexRoutes from './routes/indexRoutes';
import rolesRoutes from './routes/rolesRoutes';
import cuentaRoutes from './routes/cuentaRoutes';
import habitacionesRoutes from './routes/habitacionesRoutes';
import reservacionesRoutes from './routes/reservacionesRoutes';
import disponibilidadporfechaRoutes from './routes/disponibilidadporfechaRoutes';
import { validarToken } from './middleware/auth';
import morgan from 'morgan';
import cors from 'cors';


class Server{
    public app: Application;
        
    constructor(){
        this.app= express();
        this.config();
        this.routes();
        this.app.use('/documentacion',swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));
    }

    config (): void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes (): void{
        this.app.use(indexRoutes);
        this.app.use('/api/roles',rolesRoutes);
        this.app.use('/api/cuenta',cuentaRoutes);
        this.app.use('/api/habitaciones',habitacionesRoutes);
        this.app.use('/api/reservaciones',reservacionesRoutes);
        this.app.use('/api/disponibilidadporfecha', disponibilidadporfechaRoutes);
        //this.app.use('/api/validarToken',validarToken);
    }

    start (): void{
        this.app.listen(this.app.get('port'), () =>{
            console.log('Server on port',this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();