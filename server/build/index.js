"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const gastoRoutes_1 = __importDefault(require("./routes/gastoRoutes"));
const ingresoRoutes_1 = __importDefault(require("./routes/ingresoRoutes"));
const servicioRoutes_1 = __importDefault(require("./routes/servicioRoutes"));
const presupuestoRoutes_1 = __importDefault(require("./routes/presupuestoRoutes"));
<<<<<<< HEAD
=======
const ubicacionRoutes_1 = __importDefault(require("./routes/ubicacionRoutes"));
const twitterRoutes_1 = __importDefault(require("./routes/twitterRoutes"));
const tarjetaRoutes_1 = __importDefault(require("./routes/tarjetaRoutes"));
const telegramRoutes_1 = __importDefault(require("./routes/telegramRoutes"));
const telegramController_1 = require("./controllers/telegramController");
const videoRoutes_1 = __importDefault(require("./routes/videoRoutes"));
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/usuario', usuarioRoutes_1.default);
        this.app.use('/api/gasto', gastoRoutes_1.default);
        this.app.use('/api/ingreso', ingresoRoutes_1.default);
        this.app.use('/api/servicio', servicioRoutes_1.default);
        this.app.use('/api/presupuesto', presupuestoRoutes_1.default);
<<<<<<< HEAD
=======
        this.app.use('/api/ubicacion', ubicacionRoutes_1.default);
        this.app.use('/api/twitter', twitterRoutes_1.default);
        this.app.use('/api/tarjetas', tarjetaRoutes_1.default);
        this.app.use('/api/telegram', telegramRoutes_1.default);
        this.app.use('/api', videoRoutes_1.default);
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
        (0, telegramController_1.initializeTelegramBot)();
    }
}
const server = new Server();
server.start();
