"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const rolesRoutes_1 = __importDefault(require("./routes/rolesRoutes"));
const cuentaRoutes_1 = __importDefault(require("./routes/cuentaRoutes"));
const habitacionesRoutes_1 = __importDefault(require("./routes/habitacionesRoutes"));
const reservacionesRoutes_1 = __importDefault(require("./routes/reservacionesRoutes"));
const disponibilidadporfechaRoutes_1 = __importDefault(require("./routes/disponibilidadporfechaRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/roles', rolesRoutes_1.default);
        this.app.use('/api/cuenta', cuentaRoutes_1.default);
        this.app.use('/api/habitaciones', habitacionesRoutes_1.default);
        this.app.use('/api/reservaciones', reservacionesRoutes_1.default);
        this.app.use('/api/disponibilidadporfecha', disponibilidadporfechaRoutes_1.default);
        //this.app.use('/api/validarToken',validarToken);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
